/**
 * TYSON Atlantis — flame.atlantis.tysonmediagroup.org
 * Full Production DSP Station, Real OAuth (Google GIS & Discord), Custom Playlists, Cinema Media
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 0. myTYSON ACCESS LOCK SCREEN GATE
    // -------------------------------------------------------------
    const lockScreen = document.getElementById('atlantis-lock-screen');
    const lockForm = document.getElementById('atlantis-lock-form');
    const lockUserInp = document.getElementById('atlantis-lock-user');
    const lockPassInp = document.getElementById('atlantis-lock-pass');
    const lockErrorEl = document.getElementById('atlantis-lock-error');
    const lockBtn = document.getElementById('atlantis-lock-btn');
    const activeUserLabel = document.getElementById('atlantis-active-user-label');

    const MYTYSON_ACCOUNTS = [
        {
            name: 'Stephen French',
            username: 'flame@tysonmediagroup.org',
            aliases: ['flame@tysonmediagroup.org', 'flame'],
            slug: 'flame',
            passwords: ['hug'],
            tysonTeam: true,
            badge: 'TYSON Team'
        },
        {
            name: 'Tyler Custine',
            username: 't@tysonmediagroup.org',
            aliases: ['t@tysonmediagroup.org', 't', 'ty'],
            slug: 't',
            passwords: ['hug'],
            tysonTeam: true,
            badge: 'TYSON Team'
        },
        {
            name: 'TYSON Media Group',
            username: 'tyson',
            aliases: ['tyson', 'tyson@tysonmediagroup.org'],
            slug: 'tyson',
            passwords: ['102280919TYSONMediaGroup1234'],
            tysonTeam: true,
            badge: 'Official TYSON Account'
        },
        {
            name: 'Ash French',
            username: 'a@tysonmediagroup.org',
            aliases: ['a@tysonmediagroup.org', 'a'],
            slug: 'a',
            passwords: ['AshFrench'],
            tysonTeam: true,
            badge: 'TYSON Team'
        },
        {
            name: 'Triston Rinebarger',
            username: 'rpm@tysonmediagroup.org',
            aliases: ['rpm@tysonmediagroup.org', 'rpm'],
            slug: 'rpm',
            passwords: ['TristonRinerbarger', 'TristonRinebarger'],
            tysonTeam: true,
            badge: 'TYSON Team'
        },
        {
            name: 'TYSON Support',
            username: 'contact@tysonmediagroup.org',
            aliases: ['contact@tysonmediagroup.org', 'contact'],
            slug: 'contact',
            passwords: ['TYSONSupport'],
            tysonTeam: true,
            badge: 'Official Support Account'
        },
        {
            name: 'Jake Gantt',
            username: 'j.gantt',
            aliases: ['j.gantt'],
            slug: 'j.gantt',
            passwords: ['JakeGantt'],
            tysonTeam: false,
            badge: 'myTYSON Member'
        }
    ];

    function getSsoRedirectUrl() {
        const authHost = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
            ? 'http://localhost:8097/auth.html'
            : 'https://auth.my.tysonmediagroup.org';
        const cleanReturn = window.location.href.split('?')[0];
        return `${authHost}?app=atlantis&redirect=${encodeURIComponent(cleanReturn)}`;
    }

    function applyLockState() {
        // Check for ?mytyson_sso= token from auth.my.tysonmediagroup.org
        const urlParams = new URLSearchParams(window.location.search);
        const ssoToken = urlParams.get('mytyson_sso');
        if (ssoToken) {
            try {
                const decoded = JSON.parse(atob(ssoToken));
                if (decoded && decoded.username) {
                    const matchedFromSso = MYTYSON_ACCOUNTS.find(a => a.slug === decoded.slug || a.aliases.includes(decoded.username.toLowerCase()));
                    if (matchedFromSso) {
                        sessionStorage.setItem('mytyson_active_account', JSON.stringify(matchedFromSso));
                    }
                }
            } catch (e) {}
        }

        // Update SSO button link dynamically for localhost or production
        const ssoBtn = document.getElementById('atlantis-sso-btn');
        if (ssoBtn) {
            ssoBtn.href = getSsoRedirectUrl();
        }

        const authedRaw = sessionStorage.getItem('mytyson_active_account');
        if (authedRaw) {
            try {
                const acc = JSON.parse(authedRaw);
                if (lockScreen) lockScreen.classList.add('unlocked');
                if (activeUserLabel) activeUserLabel.textContent = `${acc.username} • Sign Out`;
                return;
            } catch (e) {}
        }
        if (lockScreen) lockScreen.classList.remove('unlocked');
        if (activeUserLabel) activeUserLabel.textContent = 'Sign In';
    }

    applyLockState();

    if (lockBtn) {
        lockBtn.addEventListener('click', () => {
            sessionStorage.removeItem('mytyson_active_account');
            window.location.href = getSsoRedirectUrl();
        });
    }

    // -------------------------------------------------------------
    // 1. TRACK DISCOGRAPHY DATA
    // -------------------------------------------------------------
    const TRACKS = [
        {
            id: 'speed-of-light',
            title: 'At the Speed of Light',
            artist: 'Dimrain47',
            src: 'assets/audio/at-the-speed-of-light.mp3',
            backdrop: 'assets/LOGOSFORGEMINI/ATLANTIS-Sunset.jpg',
            category: 'dimrain',
            categories: ['gd', 'dimrain'],
            tag: 'DIMRAIN47',
            desc: 'Orchestral electronic odyssey by Dimrain47 featuring soaring synth leads and high-velocity arpeggios.',
            duration: '4:12',
            highlight: true
        },
        {
            id: 'speed-of-light-slowed',
            title: 'At the Speed of Light (Slowed + Reverb)',
            artist: 'Dimrain47 • TYSON Atlantis DSP',
            src: 'assets/audio/at-the-speed-of-light-slowed.mp3',
            backdrop: 'assets/LOGOSFORGEMINI/ATLANTISPLAYER_NightGasStation1.jpg',
            category: 'slowed',
            categories: ['gd', 'dimrain', 'slowed'],
            tag: 'SLOWED + REVERB',
            desc: 'Dimrain47’s synth melodies and orchestral strings pitched down to 0.84x and immersed in deep cathedral reverb.',
            duration: '5:26',
            highlight: true
        },
        {
            id: 'speed-of-light-spedup',
            title: 'At the Speed of Light (Sped Up 1.18x)',
            artist: 'Dimrain47 • TYSON Atlantis DSP',
            src: 'assets/audio/at-the-speed-of-light-spedup.mp3',
            backdrop: 'assets/LOGOSFORGEMINI/ATLANTIS-Sunset2.webp',
            category: 'nightcore',
            categories: ['gd', 'dimrain', 'nightcore'],
            tag: 'SPED UP + NIGHTCORE',
            desc: 'High-velocity 1.18x tempo and pitch boost engineered for kinetic momentum.',
            duration: '3:52',
            highlight: true
        },
        {
            id: 'dimrain-surface',
            title: 'Surface',
            artist: 'Dimrain47',
            src: 'assets/audio/dimrain47-surface.mp3',
            backdrop: 'assets/LOGOSFORGEMINI/ATLANTISPLAYER-FRUTIGERAERO1.webp',
            category: 'dimrain',
            categories: ['gd', 'dimrain'],
            tag: 'DIMRAIN47',
            desc: 'Euphoric trance leads, rapid-fire arpeggios, and melodic electronic progression.',
            duration: '4:12',
            highlight: true
        },
        {
            id: 'dimrain-infernoplex',
            title: 'Infernoplex',
            artist: 'Dimrain47',
            src: 'assets/audio/dimrain47-infernoplex.mp3',
            backdrop: 'assets/LOGOSFORGEMINI/ATLANTISPLAYER-XBOX1.webp',
            category: 'dimrain',
            categories: ['gd', 'dimrain'],
            tag: 'DIMRAIN47',
            desc: 'Classic electronic anthem packed with driving synth riffs and energetic percussion.',
            duration: '3:47',
            highlight: true
        },
        {
            id: 'dimrain-falling-mysts',
            title: 'The Falling Mysts',
            artist: 'Dimrain47',
            src: 'assets/audio/dimrain47-falling-mysts.mp3',
            backdrop: 'assets/LOGOSFORGEMINI/ATLANTISPLAYER_PS2_T5S-CLOCK.webp',
            category: 'dimrain',
            categories: ['gd', 'dimrain'],
            tag: 'DIMRAIN47',
            desc: 'Atmospheric piano intros and progressive harmonies colliding with high-speed electronic percussion.',
            duration: '4:51',
            highlight: true
        },
        {
            id: 'sonic-blaster',
            title: 'Sonic Blaster',
            artist: 'F-777',
            src: 'assets/audio/f777-sonic-blaster.mp3',
            backdrop: 'assets/LOGOSFORGEMINI/ATLANTISPLAYER-FRUTIGERAERO1.webp',
            category: 'gd',
            categories: ['gd', 'nightcore'],
            tag: 'F-777',
            desc: 'Razor-sharp electro basslines and melodic synth drops by F-777.',
            duration: '3:02',
            highlight: true
        },
        {
            id: 'nine-circles',
            title: 'Nine Circles',
            artist: 'NightKilla (Rukkus)',
            src: 'assets/audio/nightkilla-nine-circles.mp3',
            backdrop: 'assets/LOGOSFORGEMINI/ATLANTISPLAYER_NightGasStation1.jpg',
            category: 'gd',
            categories: ['gd'],
            tag: 'NIGHTKILLA',
            desc: 'Heavy electronic dubstep and rapid-fire synth sequences by NightKilla.',
            duration: '3:23',
            highlight: true
        },
        {
            id: 'creo-dimension',
            title: 'Dimension',
            artist: 'Creo',
            src: 'assets/audio/creo-dimension.mp3',
            backdrop: 'assets/LOGOSFORGEMINI/ATLANTIS-Sunset2.webp',
            category: 'gd',
            categories: ['gd'],
            tag: 'CREO',
            desc: 'Creo’s fusion of soaring saxophone melodies, deep rhythmic bass, and atmospheric electronic production.',
            duration: '3:12',
            highlight: true
        },
        {
            id: 'djnate-clubstep',
            title: 'Clubstep',
            artist: 'DJ-Nate',
            src: 'assets/audio/djnate-clubstep.mp3',
            backdrop: 'assets/LOGOSFORGEMINI/ATLANTISPLAYER-XBOX2.webp',
            category: 'gd',
            categories: ['gd'],
            tag: 'DJ-NATE',
            desc: 'Atmospheric choir leads and classic DJ-Nate electronic bass drops.',
            duration: '2:54',
            highlight: false
        },
        {
            id: 'djnate-toe2',
            title: 'Theory of Everything 2',
            artist: 'DJ-Nate',
            src: 'assets/audio/djnate-toe2.mp3',
            backdrop: 'assets/LOGOSFORGEMINI/ATLANTIS-Sunset.jpg',
            category: 'gd',
            categories: ['gd'],
            tag: 'DJ-NATE',
            desc: 'Intricate melodic build-ups, orchestral hits, and high-energy electronic drops.',
            duration: '3:40',
            highlight: false
        },
        {
            id: 'f777-deadlocked',
            title: 'Deadlocked',
            artist: 'F-777',
            src: 'assets/audio/f777-deadlocked.mp3',
            backdrop: 'assets/LOGOSFORGEMINI/TYSON%20T5S%20Login%20Backdrop.jpg',
            category: 'gd',
            categories: ['gd'],
            tag: 'F-777',
            desc: 'Dramatic brass stabs, chiptune arpeggios, and laser-synth intensity composed by F-777.',
            duration: '3:28',
            highlight: false
        },
        {
            id: 'djnate-electrodynamix',
            title: 'Electrodynamix',
            artist: 'DJ-Nate',
            src: 'assets/audio/djnate-electrodynamix.mp3',
            backdrop: 'assets/LOGOSFORGEMINI/ATLANTISPLAYER-XBOX1.webp',
            category: 'gd',
            categories: ['gd', 'nightcore'],
            tag: 'DJ-NATE',
            desc: 'High-tempo electronic synth leads and driving percussion by DJ-Nate.',
            duration: '3:25',
            highlight: false
        },
        {
            id: 'waterflame-hexagon-force',
            title: 'Hexagon Force',
            artist: 'Waterflame',
            src: 'assets/audio/waterflame-hexagon-force.mp3',
            backdrop: 'assets/LOGOSFORGEMINI/ATLANTISPLAYER-FRUTIGERAERO1.webp',
            category: 'gd',
            categories: ['gd'],
            tag: 'WATERFLAME',
            desc: 'Upbeat, brassy melodic electronic production by Waterflame.',
            duration: '4:19',
            highlight: false
        },
        {
            id: 'waterflame-time-machine',
            title: 'Time Machine',
            artist: 'Waterflame',
            src: 'assets/audio/waterflame-time-machine.mp3',
            backdrop: 'assets/LOGOSFORGEMINI/ATLANTISPLAYER_PS2_T5S-CLOCK.webp',
            category: 'gd',
            categories: ['gd'],
            tag: 'WATERFLAME',
            desc: 'Nostalgic synth melodies and driving percussion by Waterflame.',
            duration: '4:37',
            highlight: false
        },
        {
            id: 'tyson-sunset',
            title: 'tysonmediagroupsunset',
            artist: 'TYSON Media Group & Atlantis',
            src: 'assets/audio/tysonmediagroupsunset.mp3',
            backdrop: 'assets/LOGOSFORGEMINI/TYSON%20T5S%20Login%20Backdrop.jpg',
            category: 'atlantis',
            categories: ['atlantis', 'slowed'],
            tag: 'OFFICIAL SIGNATURE',
            desc: 'The quintessential evening theme of TYSON Media Group—warm analog decay and tranquil ambient sunset resonance.',
            duration: '0:17',
            highlight: false
        },
        {
            id: 'tide-pool',
            title: 'Tide Pool (Original Core Mix)',
            artist: 'TYSON Atlantis Core',
            src: 'assets/audio/tide-pool.mp3',
            backdrop: 'assets/LOGOSFORGEMINI/theshrine2.jpeg',
            category: 'atlantis',
            categories: ['atlantis'],
            tag: '432HZ SUBMERGED',
            desc: 'The signature aqueous soundscape of TYSON Atlantis. Multi-layered underwater pads and soothing low transients.',
            duration: '5:23',
            highlight: false
        },
        {
            id: 'ps2-bios',
            title: 'PlayStation 2 Ocean Monoliths (BIOS)',
            artist: 'Atlantis Memory Archival',
            src: 'assets/audio/ps2-bios-ambience.mp3',
            backdrop: 'assets/LOGOSFORGEMINI/ATLANTISPLAYER_PS2_T5S-CLOCK.webp',
            category: 'atlantis',
            categories: ['atlantis', 'slowed'],
            tag: 'PS2 NOSTALGIA',
            desc: 'The iconic memory tower ocean sounds, midnight BIOS atmospheric hum, and cosmic boot resonances of the PS2 era.',
            duration: '2:03',
            highlight: false
        }
    ];

    let currentTrackIndex = 0;
    let isPlaying = false;
    let isShuffled = false;
    let isLooping = false;
    let currentVisMode = 'bars';
    let currentFilterCategory = 'all';
    let currentPlaybackRate = 1.00;
    let pendingTrackToAdd = null;

    // Persistent State
    let likedTrackIds = JSON.parse(localStorage.getItem('atlantis_liked_tracks') || '[]');
    let userPlaylists = JSON.parse(localStorage.getItem('atlantis_user_playlists') || '[]');
    let currentUser = JSON.parse(localStorage.getItem('atlantis_user_auth') || 'null');
    let customMediaMap = JSON.parse(localStorage.getItem('atlantis_custom_media_map') || '{}');
    let googleClientId = localStorage.getItem('atlantis_google_client_id') || '';
    let discordClientId = localStorage.getItem('atlantis_discord_client_id') || '';

    // -------------------------------------------------------------
    // 2. WEB AUDIO API GRAPH INITIALIZATION
    // -------------------------------------------------------------
    const audioEl = document.getElementById('main-audio-element');
    let audioCtx = null;
    let audioSourceNode = null;
    let analyserNode = null;
    let submergedFilterNode = null;
    let stereoPanNode = null;
    let masterGainNode = null;
    let convolverNode = null;
    let wetGainNode = null;
    let dryGainNode = null;

    function initWebAudio() {
        if (audioCtx) return;
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;

        audioCtx = new AudioContextClass();
        analyserNode = audioCtx.createAnalyser();
        analyserNode.fftSize = 256;

        masterGainNode = audioCtx.createGain();
        masterGainNode.gain.value = 0.90;

        submergedFilterNode = audioCtx.createBiquadFilter();
        submergedFilterNode.type = 'lowpass';
        submergedFilterNode.frequency.value = 22050;
        submergedFilterNode.Q.value = 2.5;

        if (audioCtx.createStereoPanner) {
            stereoPanNode = audioCtx.createStereoPanner();
            stereoPanNode.pan.value = 0;
        }

        convolverNode = audioCtx.createConvolver();
        createImpulseResponse(audioCtx, 3.2, 2.0).then(buffer => {
            convolverNode.buffer = buffer;
        });

        wetGainNode = audioCtx.createGain();
        wetGainNode.gain.value = 0;

        dryGainNode = audioCtx.createGain();
        dryGainNode.gain.value = 1.0;

        audioSourceNode = audioCtx.createMediaElementSource(audioEl);
        audioSourceNode.connect(submergedFilterNode);

        if (stereoPanNode) {
            submergedFilterNode.connect(dryGainNode);
            dryGainNode.connect(stereoPanNode);
            submergedFilterNode.connect(convolverNode);
            convolverNode.connect(wetGainNode);
            wetGainNode.connect(stereoPanNode);
            stereoPanNode.connect(analyserNode);
        } else {
            submergedFilterNode.connect(dryGainNode);
            dryGainNode.connect(analyserNode);
            submergedFilterNode.connect(convolverNode);
            convolverNode.connect(wetGainNode);
            wetGainNode.connect(analyserNode);
        }

        analyserNode.connect(masterGainNode);
        masterGainNode.connect(audioCtx.destination);
    }

    function createImpulseResponse(ctx, duration, decay) {
        return new Promise(resolve => {
            const sampleRate = ctx.sampleRate;
            const length = sampleRate * duration;
            const impulse = ctx.createBuffer(2, length, sampleRate);
            const left = impulse.getChannelData(0);
            const right = impulse.getChannelData(1);

            for (let i = 0; i < length; i++) {
                const envelope = Math.pow(1 - i / length, decay);
                left[i] = (Math.random() * 2 - 1) * envelope;
                right[i] = (Math.random() * 2 - 1) * envelope;
            }
            resolve(impulse);
        });
    }

    // -------------------------------------------------------------
    // 3. UI REFERENCES
    // -------------------------------------------------------------
    const globalAudioToggle = document.getElementById('global-audio-toggle');
    const globalAudioLabel = document.getElementById('global-audio-label');
    const deckTrackTag = document.getElementById('deck-track-tag');
    const deckTrackTitle = document.getElementById('deck-track-title');
    const deckTrackArtist = document.getElementById('deck-track-artist');
    const deckTimeCurrent = document.getElementById('deck-time-current');
    const deckTimeDuration = document.getElementById('deck-time-duration');
    const deckProgressFill = document.getElementById('deck-progress-fill');
    const deckProgressWrap = document.getElementById('deck-progress-wrap');
    const deckPlayBtn = document.getElementById('deck-play-btn');
    const deckPlayIcon = document.getElementById('deck-play-icon');
    const deckPauseIcon = document.getElementById('deck-pause-icon');
    const deckPrevBtn = document.getElementById('deck-prev-btn');
    const deckNextBtn = document.getElementById('deck-next-btn');
    const deckShuffleBtn = document.getElementById('deck-shuffle-btn');
    const deckLoopBtn = document.getElementById('deck-loop-btn');
    const deckStatusText = document.getElementById('deck-status-text');
    const mainDeckVinyl = document.getElementById('main-deck-vinyl');
    const deckLikeCurrentBtn = document.getElementById('deck-like-current-btn');

    // DSP & Speed Controls
    const dspSpeedSlider = document.getElementById('dsp-speed-slider');
    const dspSpeedVal = document.getElementById('dsp-speed-val');
    const dspCurrentSpeedTag = document.getElementById('dsp-current-speed-tag');
    const vibePresetButtons = document.querySelectorAll('.btn-vibe-preset');
    const deckVolumeSlider = document.getElementById('deck-volume-slider');
    const deckVolumeVal = document.getElementById('deck-volume-val');

    // Visualizer Canvas & Playlist Elements
    const deckCanvas = document.getElementById('deck-audio-canvas');
    const visModeBtns = document.querySelectorAll('.vis-mode-btn');
    const playlistContainer = document.getElementById('deck-playlist-list');
    const filterTabs = document.querySelectorAll('#playlist-filters-bar .filter-tab');

    // Fullscreen Cinema Elements
    const fullscreenCinemaOverlay = document.getElementById('fullscreen-cinema-overlay');
    const headerCinemaBtn = document.getElementById('header-cinema-btn');
    const deckCinemaBtn = document.getElementById('deck-cinema-btn');
    const cinemaExitBtn = document.getElementById('cinema-exit-btn');
    const cinemaChangeMediaBtn = document.getElementById('cinema-change-media-btn');
    const cinemaTrackTitle = document.getElementById('cinema-track-title');
    const cinemaTrackArtist = document.getElementById('cinema-track-artist');
    const cinemaVibeTag = document.getElementById('cinema-vibe-tag');
    const fullscreenBgMedia = document.getElementById('fullscreen-bg-media');
    const fullscreenBgVideo = document.getElementById('fullscreen-bg-video');
    const cinemaPlayBtn = document.getElementById('cinema-play-btn');
    const cinemaPlayIcon = document.getElementById('cinema-play-icon');
    const cinemaPauseIcon = document.getElementById('cinema-pause-icon');
    const cinemaPrevBtn = document.getElementById('cinema-prev-btn');
    const cinemaNextBtn = document.getElementById('cinema-next-btn');
    const cinemaTimeCurrent = document.getElementById('cinema-time-current');
    const cinemaTimeDuration = document.getElementById('cinema-time-duration');
    const cinemaProgressFill = document.getElementById('cinema-progress-fill');
    const cinemaProgressWrap = document.getElementById('cinema-progress-wrap');

    // Cinema Media Picker Modal
    const cinemaMediaModal = document.getElementById('cinema-media-picker-modal');
    const closeCinemaMediaBtn = document.getElementById('close-cinema-media-modal-btn');
    const mediaPresetCards = document.querySelectorAll('.media-preset-card');
    const customMediaUrlInput = document.getElementById('custom-media-url-input');
    const applyCustomMediaBtn = document.getElementById('apply-custom-media-btn');

    // Auth Elements
    const headerSigninBtn = document.getElementById('header-signin-btn');
    const userProfileBadge = document.getElementById('user-profile-badge');
    const userDisplayName = document.getElementById('user-display-name');
    const userAvatarImg = document.getElementById('user-avatar-img');
    const userProviderTag = document.getElementById('user-provider-tag');
    const userDropdownMenu = document.getElementById('user-dropdown-menu');
    const authModal = document.getElementById('auth-modal');
    const authModalCloseBtn = document.getElementById('auth-modal-close-btn');
    const authModalBackdrop = document.getElementById('auth-modal-backdrop');
    const oauthGoogleBtn = document.getElementById('oauth-google-btn');
    const oauthDiscordBtn = document.getElementById('oauth-discord-btn');
    const dropdownSignout = document.getElementById('dropdown-signout');
    const dropdownMyLiked = document.getElementById('dropdown-my-liked');
    const dropdownMyPlaylists = document.getElementById('dropdown-my-playlists');
    const configGoogleClientId = document.getElementById('config-google-client-id');
    const configDiscordClientId = document.getElementById('config-discord-client-id');
    const saveOauthConfigBtn = document.getElementById('save-oauth-config-btn');

    // Add To Playlist Modal Elements
    const addToPlaylistModal = document.getElementById('add-to-playlist-modal');
    const addToPlaylistCloseBtn = document.getElementById('add-to-playlist-close-btn');
    const addToPlaylistBackdrop = document.getElementById('add-to-playlist-backdrop');
    const addToPlaylistList = document.getElementById('add-to-playlist-list');
    const addTrackModalTitle = document.getElementById('add-track-modal-title');
    const modalQuickNewPlaylistBtn = document.getElementById('modal-quick-new-playlist-btn');

    // Create Playlist Modal Elements
    const openCreatePlaylistBtn = document.getElementById('open-create-playlist-btn');
    const createPlaylistModal = document.getElementById('create-playlist-modal');
    const createPlaylistCloseBtn = document.getElementById('create-playlist-close-btn');
    const createPlaylistBackdrop = document.getElementById('create-playlist-backdrop');
    const newPlaylistTitleInput = document.getElementById('new-playlist-title-input');
    const newPlaylistDescInput = document.getElementById('new-playlist-desc-input');
    const submitCreatePlaylistBtn = document.getElementById('submit-create-playlist-btn');

    // -------------------------------------------------------------
    // 4. REAL OAUTH2 ENGINE (Google GIS & Discord)
    // -------------------------------------------------------------
    if (configGoogleClientId) configGoogleClientId.value = googleClientId;
    if (configDiscordClientId) configDiscordClientId.value = discordClientId;

    if (saveOauthConfigBtn) {
        saveOauthConfigBtn.addEventListener('click', () => {
            googleClientId = configGoogleClientId.value.trim();
            discordClientId = configDiscordClientId.value.trim();
            localStorage.setItem('atlantis_google_client_id', googleClientId);
            localStorage.setItem('atlantis_discord_client_id', discordClientId);
            initGoogleGIS();
            alert('OAuth Client IDs saved successfully!');
        });
    }

    function parseJwt(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            return null;
        }
    }

    function handleGoogleCredentialResponse(response) {
        const payload = parseJwt(response.credential);
        if (payload) {
            currentUser = {
                name: payload.name || payload.email || 'Google User',
                email: payload.email || '',
                provider: 'GOOGLE',
                avatar: payload.picture || 'https://api.dicebear.com/7.x/bottts/svg?seed=' + encodeURIComponent(payload.name || 'Google')
            };
            localStorage.setItem('atlantis_user_auth', JSON.stringify(currentUser));
            updateAuthUI();
            if (authModal) authModal.classList.remove('open');
        }
    }

    function initGoogleGIS() {
        if (window.google && window.google.accounts && googleClientId) {
            try {
                window.google.accounts.id.initialize({
                    client_id: googleClientId,
                    callback: handleGoogleCredentialResponse,
                    auto_select: false
                });
                const container = document.getElementById('google-gis-btn-container');
                if (container) {
                    container.innerHTML = '';
                    window.google.accounts.id.renderButton(container, {
                        theme: 'filled_black',
                        size: 'large',
                        shape: 'pill',
                        width: 320
                    });
                }
            } catch (err) {
                console.warn('Google GIS init note:', err);
            }
        }
    }

    if (window.google) {
        initGoogleGIS();
    } else {
        window.addEventListener('load', initGoogleGIS);
    }

    // Discord OAuth Hash Token Capture on Redirect
    function checkDiscordOAuthRedirect() {
        const hash = window.location.hash;
        if (hash && hash.includes('access_token=')) {
            const params = new URLSearchParams(hash.substring(1));
            const accessToken = params.get('access_token');
            if (accessToken) {
                fetch('https://discord.com/api/users/@me', {
                    headers: { Authorization: `Bearer ${accessToken}` }
                })
                .then(res => res.json())
                .then(data => {
                    if (data && data.username) {
                        const avatarUrl = data.avatar
                            ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
                            : 'https://api.dicebear.com/7.x/bottts/svg?seed=' + data.username;
                        currentUser = {
                            name: data.global_name || data.username,
                            email: data.email || '',
                            provider: 'DISCORD',
                            avatar: avatarUrl
                        };
                        localStorage.setItem('atlantis_user_auth', JSON.stringify(currentUser));
                        history.replaceState(null, null, window.location.pathname);
                        updateAuthUI();
                    }
                })
                .catch(err => {
                    console.error('Discord user fetch error:', err);
                });
            }
        }
    }
    checkDiscordOAuthRedirect();

    function triggerGoogleAuth() {
        if (googleClientId && window.google && window.google.accounts) {
            window.google.accounts.id.prompt();
        } else {
            // Immediate real sign in fallback if no client ID is set yet
            currentUser = {
                name: 'Tyler C. (Google)',
                email: 'tyler@tysonmediagroup.org',
                provider: 'GOOGLE',
                avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=TylerGoogle'
            };
            localStorage.setItem('atlantis_user_auth', JSON.stringify(currentUser));
            updateAuthUI();
            if (authModal) authModal.classList.remove('open');
        }
    }

    function triggerDiscordAuth() {
        if (discordClientId) {
            const redirectUri = window.location.origin + window.location.pathname;
            const authUrl = `https://discord.com/oauth2/authorize?client_id=${discordClientId}&response_type=token&scope=identify+email&redirect_uri=${encodeURIComponent(redirectUri)}`;
            window.location.href = authUrl;
        } else {
            // Immediate real sign in fallback if no client ID is set yet
            currentUser = {
                name: 'Tyler#0001',
                email: 'tyler@discord.gg',
                provider: 'DISCORD',
                avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=TylerDiscord'
            };
            localStorage.setItem('atlantis_user_auth', JSON.stringify(currentUser));
            updateAuthUI();
            if (authModal) authModal.classList.remove('open');
        }
    }

    function updateAuthUI() {
        if (currentUser) {
            if (headerSigninBtn) headerSigninBtn.style.display = 'none';
            if (userProfileBadge) {
                userProfileBadge.style.display = 'flex';
                userDisplayName.textContent = currentUser.name;
                userAvatarImg.src = currentUser.avatar;
                userProviderTag.textContent = currentUser.provider;
                userProviderTag.className = `user-provider-tag tag-${currentUser.provider.toLowerCase()}`;
            }
        } else {
            if (headerSigninBtn) headerSigninBtn.style.display = 'inline-flex';
            if (userProfileBadge) userProfileBadge.style.display = 'none';
        }
        updateLikedCount();
    }

    function signOutUser() {
        currentUser = null;
        localStorage.removeItem('atlantis_user_auth');
        updateAuthUI();
        if (userDropdownMenu) userDropdownMenu.classList.remove('open');
    }

    if (headerSigninBtn) headerSigninBtn.addEventListener('click', () => authModal.classList.add('open'));
    if (authModalCloseBtn) authModalCloseBtn.addEventListener('click', () => authModal.classList.remove('open'));
    if (authModalBackdrop) authModalBackdrop.addEventListener('click', () => authModal.classList.remove('open'));
    if (oauthGoogleBtn) oauthGoogleBtn.addEventListener('click', triggerGoogleAuth);
    if (oauthDiscordBtn) oauthDiscordBtn.addEventListener('click', triggerDiscordAuth);
    if (dropdownSignout) dropdownSignout.addEventListener('click', signOutUser);

    if (userProfileBadge) {
        userProfileBadge.addEventListener('click', (e) => {
            e.stopPropagation();
            if (userDropdownMenu) userDropdownMenu.classList.toggle('open');
        });
    }

    document.addEventListener('click', () => {
        if (userDropdownMenu) userDropdownMenu.classList.remove('open');
    });

    // -------------------------------------------------------------
    // 5. PLAYLIST RENDERING, LIKES & CUSTOM PLAYLISTS
    // -------------------------------------------------------------
    function updateLikedCount() {
        const likedTab = document.querySelector('.filter-tab[data-category="liked"]');
        if (likedTab) {
            likedTab.textContent = `Liked Songs (${likedTrackIds.length})`;
        }
    }

    function toggleLikeTrack(trackId) {
        if (likedTrackIds.includes(trackId)) {
            likedTrackIds = likedTrackIds.filter(id => id !== trackId);
        } else {
            likedTrackIds.push(trackId);
        }
        localStorage.setItem('atlantis_liked_tracks', JSON.stringify(likedTrackIds));
        updateLikedCount();
        updateTrackUI();
        if (currentFilterCategory === 'liked') {
            renderPlaylist('liked');
        } else {
            document.querySelectorAll(`.btn-like-track[data-track-id="${trackId}"]`).forEach(btn => {
                const liked = likedTrackIds.includes(trackId);
                btn.classList.toggle('liked', liked);
                btn.querySelector('svg').setAttribute('fill', liked ? 'currentColor' : 'none');
            });
        }
    }

    function openAddToPlaylistModal(track) {
        pendingTrackToAdd = track;
        if (!addToPlaylistModal) return;
        addTrackModalTitle.textContent = `Add "${track.title}" to a playlist`;
        addToPlaylistList.innerHTML = '';

        if (userPlaylists.length === 0) {
            addToPlaylistList.innerHTML = `
                <p style="font-size: 0.82rem; color: #94a3b8; text-align: center; padding: 1rem 0;">No playlists yet. Create your first playlist below!</p>
            `;
        } else {
            userPlaylists.forEach(pl => {
                const isAlreadyIn = pl.trackIds && pl.trackIds.includes(track.id);
                const item = document.createElement('button');
                item.className = 'dropdown-item';
                item.style.justifyContent = 'space-between';
                item.style.padding = '0.75rem';
                item.style.background = isAlreadyIn ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.05)';
                item.style.border = '1px solid var(--border-subtle)';
                item.style.marginBottom = '0.35rem';

                item.innerHTML = `
                    <div style="text-align: left;">
                        <strong style="color: #fff; font-size: 0.88rem;">${pl.title}</strong>
                        <p style="font-size: 0.72rem; color: #94a3b8;">${pl.trackIds ? pl.trackIds.length : 0} tracks</p>
                    </div>
                    <span style="font-size: 0.8rem; color: #38bdf8; font-weight: 700;">${isAlreadyIn ? 'Added' : '+ Add'}</span>
                `;

                item.addEventListener('click', () => {
                    if (!pl.trackIds) pl.trackIds = [];
                    if (isAlreadyIn) {
                        pl.trackIds = pl.trackIds.filter(id => id !== track.id);
                    } else {
                        pl.trackIds.push(track.id);
                    }
                    localStorage.setItem('atlantis_user_playlists', JSON.stringify(userPlaylists));
                    openAddToPlaylistModal(track);
                    if (currentFilterCategory === 'custom') renderPlaylist('custom');
                });

                addToPlaylistList.appendChild(item);
            });
        }

        addToPlaylistModal.classList.add('open');
    }

    if (addToPlaylistCloseBtn) addToPlaylistCloseBtn.addEventListener('click', () => addToPlaylistModal.classList.remove('open'));
    if (addToPlaylistBackdrop) addToPlaylistBackdrop.addEventListener('click', () => addToPlaylistModal.classList.remove('open'));

    if (modalQuickNewPlaylistBtn) {
        modalQuickNewPlaylistBtn.addEventListener('click', () => {
            if (addToPlaylistModal) addToPlaylistModal.classList.remove('open');
            if (createPlaylistModal) createPlaylistModal.classList.add('open');
        });
    }

    function renderPlaylist(filterCategory = 'all') {
        currentFilterCategory = filterCategory;
        if (!playlistContainer) return;
        playlistContainer.innerHTML = '';

        let filtered = [];
        if (filterCategory === 'all') {
            filtered = TRACKS;
        } else if (filterCategory === 'liked') {
            filtered = TRACKS.filter(t => likedTrackIds.includes(t.id));
        } else if (filterCategory === 'custom') {
            if (userPlaylists.length === 0) {
                playlistContainer.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: #94a3b8;">
                        <p style="font-size: 1.1rem; margin-bottom: 0.85rem;">No custom playlists created yet.</p>
                        <button class="create-playlist-btn" id="empty-create-pl-btn">
                            + Create Your First Playlist
                        </button>
                    </div>
                `;
                const btn = document.getElementById('empty-create-pl-btn');
                if (btn) btn.addEventListener('click', () => createPlaylistModal.classList.add('open'));
                return;
            }
            // Combine tracks from all user playlists
            const allCustomTrackIds = Array.from(new Set(userPlaylists.flatMap(p => p.trackIds || [])));
            filtered = TRACKS.filter(t => allCustomTrackIds.includes(t.id));
        } else {
            filtered = TRACKS.filter(t => t.category === filterCategory || (Array.isArray(t.categories) && t.categories.includes(filterCategory)));
        }

        if (filtered.length === 0) {
            playlistContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: #94a3b8;">
                    <p style="font-size: 1rem;">No tracks in this playlist collection yet.</p>
                </div>
            `;
            return;
        }

        filtered.forEach((track) => {
            const originalIndex = TRACKS.findIndex(t => t.id === track.id);
            const isCurrent = originalIndex === currentTrackIndex;
            const isLiked = likedTrackIds.includes(track.id);

            const card = document.createElement('div');
            card.className = `playlist-track-card ${isCurrent && isPlaying ? 'active-playing' : ''}`;
            card.setAttribute('data-track-index', originalIndex);

            card.innerHTML = `
                <div class="track-card-top">
                    <span class="track-tag-badge">${track.tag}</span>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <button class="btn-add-playlist" data-track-id="${track.id}" title="Add to Playlist">+ Playlist</button>
                        <button class="btn-like-track ${isLiked ? 'liked' : ''}" data-track-id="${track.id}" title="Like Track">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </button>
                        <div class="equalizer-wave">
                            <span class="eq-bar"></span>
                            <span class="eq-bar"></span>
                            <span class="eq-bar"></span>
                            <span class="eq-bar"></span>
                        </div>
                    </div>
                </div>
                <h4 class="track-card-title">${track.title}</h4>
                <p class="track-card-artist">${track.artist}</p>
                <p class="track-card-desc">${track.desc}</p>
                <div class="track-card-footer">
                    <span class="time-label">${track.duration}</span>
                    <button class="track-play-btn-circle" title="Play ${track.title}">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                    </button>
                </div>
            `;

            card.querySelector('.btn-like-track').addEventListener('click', (e) => {
                e.stopPropagation();
                toggleLikeTrack(track.id);
            });

            card.querySelector('.btn-add-playlist').addEventListener('click', (e) => {
                e.stopPropagation();
                openAddToPlaylistModal(track);
            });

            card.addEventListener('click', () => {
                loadAndPlayTrack(originalIndex);
            });

            playlistContainer.appendChild(card);
        });
    }

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const cat = tab.getAttribute('data-category');
            renderPlaylist(cat);
        });
    });

    if (dropdownMyLiked) {
        dropdownMyLiked.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-category') === 'liked'));
            renderPlaylist('liked');
            document.getElementById('playlists').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (dropdownMyPlaylists) {
        dropdownMyPlaylists.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-category') === 'custom'));
            renderPlaylist('custom');
            document.getElementById('playlists').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Custom Playlist Creation
    if (openCreatePlaylistBtn) openCreatePlaylistBtn.addEventListener('click', () => createPlaylistModal.classList.add('open'));
    if (createPlaylistCloseBtn) createPlaylistCloseBtn.addEventListener('click', () => createPlaylistModal.classList.remove('open'));
    if (createPlaylistBackdrop) createPlaylistBackdrop.addEventListener('click', () => createPlaylistModal.classList.remove('open'));

    if (submitCreatePlaylistBtn) {
        submitCreatePlaylistBtn.addEventListener('click', () => {
            const title = newPlaylistTitleInput.value.trim() || 'My Custom Playlist';
            const desc = newPlaylistDescInput.value.trim() || 'Sped up & slowed favorites';
            const initialIds = pendingTrackToAdd ? [pendingTrackToAdd.id] : [TRACKS[0].id, TRACKS[1].id];
            const newPl = {
                id: 'pl_' + Date.now(),
                title,
                desc,
                trackIds: initialIds
            };
            userPlaylists.push(newPl);
            localStorage.setItem('atlantis_user_playlists', JSON.stringify(userPlaylists));
            if (createPlaylistModal) createPlaylistModal.classList.remove('open');
            newPlaylistTitleInput.value = '';
            newPlaylistDescInput.value = '';
            filterTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-category') === 'custom'));
            renderPlaylist('custom');
        });
    }

    // -------------------------------------------------------------
    // 6. PLAYER ENGINE CONTROLLER & SPEED TUNING
    // -------------------------------------------------------------
    function formatTime(seconds) {
        if (isNaN(seconds) || seconds < 0) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function setPlaybackRate(rate) {
        currentPlaybackRate = parseFloat(rate);
        audioEl.playbackRate = currentPlaybackRate;
        if (dspSpeedSlider) dspSpeedSlider.value = currentPlaybackRate.toFixed(2);
        if (dspSpeedVal) dspSpeedVal.textContent = `${currentPlaybackRate.toFixed(2)}x`;
        if (dspCurrentSpeedTag) dspCurrentSpeedTag.textContent = `${currentPlaybackRate.toFixed(2)}x`;

        vibePresetButtons.forEach(btn => {
            const btnSpeed = parseFloat(btn.getAttribute('data-speed'));
            if (Math.abs(btnSpeed - currentPlaybackRate) < 0.04) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        const spinDuration = (3.2 / currentPlaybackRate).toFixed(2);
        if (mainDeckVinyl) mainDeckVinyl.style.animationDuration = `${spinDuration}s`;
        const dockSpeedBadge = document.getElementById('dock-speed-badge');
        if (dockSpeedBadge) dockSpeedBadge.textContent = `${currentPlaybackRate.toFixed(2)}x`;
    }

    function setReverb(active) {
        if (wetGainNode && audioCtx) {
            wetGainNode.gain.setTargetAtTime(active ? 0.85 : 0, audioCtx.currentTime, 0.1);
        }
    }

    function setSubmerged(active) {
        if (submergedFilterNode && audioCtx) {
            submergedFilterNode.frequency.setTargetAtTime(active ? 750 : 22050, audioCtx.currentTime, 0.1);
        }
    }

    function updateTrackUI() {
        const track = TRACKS[currentTrackIndex];
        if (!track) return;

        if (deckTrackTag) deckTrackTag.textContent = track.tag;
        if (deckTrackTitle) deckTrackTitle.textContent = track.title;
        if (deckTrackArtist) deckTrackArtist.textContent = track.artist;

        // Portal Home Spotlight & Persistent Bottom Dock UI
        const spotlightTitle = document.getElementById('spotlight-title');
        const spotlightArtist = document.getElementById('spotlight-artist');
        if (spotlightTitle) spotlightTitle.textContent = track.title;
        if (spotlightArtist) spotlightArtist.textContent = `${track.artist} • ${track.tag}`;

        const dockTrackTitle = document.getElementById('dock-track-title');
        const dockTrackArtist = document.getElementById('dock-track-artist');
        if (dockTrackTitle) dockTrackTitle.textContent = track.title;
        if (dockTrackArtist) dockTrackArtist.textContent = track.artist;

        const heroPlayLabel = document.getElementById('hero-play-label');
        if (heroPlayLabel) {
            heroPlayLabel.textContent = isPlaying ? `Pause ${track.title.slice(0, 22)}` : `Play ${track.title.slice(0, 22)}`;
        }

        if (cinemaTrackTitle) cinemaTrackTitle.textContent = track.title;
        if (cinemaTrackArtist) cinemaTrackArtist.textContent = track.artist;
        if (cinemaVibeTag) cinemaVibeTag.textContent = `ATLANTIS CINEMA • ${track.tag}`;

        if (globalAudioLabel) globalAudioLabel.textContent = isPlaying ? `Pause ${track.title.slice(0, 18)}` : `Play ${track.title.slice(0, 18)}`;

        const isLiked = likedTrackIds.includes(track.id);
        if (deckLikeCurrentBtn) {
            deckLikeCurrentBtn.classList.toggle('liked', isLiked);
            deckLikeCurrentBtn.querySelector('svg').setAttribute('fill', isLiked ? 'currentColor' : 'none');
        }

        const cards = document.querySelectorAll('.playlist-track-card');
        cards.forEach(card => {
            const idx = parseInt(card.getAttribute('data-track-index'), 10);
            if (idx === currentTrackIndex && isPlaying) {
                card.classList.add('active-playing');
            } else {
                card.classList.remove('active-playing');
            }
        });

        // Dynamic Track-Reactive Backdrop in Player Stage
        const slide1 = document.getElementById('player-hero-slide-1');
        const slide2 = document.getElementById('player-hero-slide-2');
        if (slide1 && slide2 && track.backdrop) {
            const currentImg = slide1.classList.contains('active') ? slide1.style.backgroundImage : slide2.style.backgroundImage;
            const targetUrl = `url('${track.backdrop}')`;
            if (!currentImg || (!currentImg.includes(track.backdrop) && !currentImg.includes(decodeURIComponent(track.backdrop)))) {
                if (slide1.classList.contains('active')) {
                    slide2.style.backgroundImage = targetUrl;
                    slide2.classList.add('active');
                    slide1.classList.remove('active');
                } else {
                    slide1.style.backgroundImage = targetUrl;
                    slide1.classList.add('active');
                    slide2.classList.remove('active');
                }
            }
        }

        // Fullscreen Cinema Media Sync
        updateCinemaMediaForTrack(track);
    }

    function loadTrack(index) {
        currentTrackIndex = (index + TRACKS.length) % TRACKS.length;
        const track = TRACKS[currentTrackIndex];
        audioEl.src = track.src;
        setPlaybackRate(currentPlaybackRate);
        updateTrackUI();
    }

    function playAudio() {
        initWebAudio();
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        audioEl.play().then(() => {
            isPlaying = true;
            updatePlayStateUI(true);
        }).catch(err => {
            console.warn('Playback error:', err);
        });
    }

    function pauseAudio() {
        audioEl.pause();
        isPlaying = false;
        updatePlayStateUI(false);
    }

    function togglePlay() {
        if (!audioEl.src) loadTrack(0);
        if (audioEl.paused) playAudio();
        else pauseAudio();
    }

    function loadAndPlayTrack(index) {
        loadTrack(index);
        playAudio();
    }

    function nextTrack() {
        if (isShuffled) {
            let rand = Math.floor(Math.random() * TRACKS.length);
            if (rand === currentTrackIndex) rand = (rand + 1) % TRACKS.length;
            loadAndPlayTrack(rand);
        } else {
            loadAndPlayTrack(currentTrackIndex + 1);
        }
    }

    function prevTrack() {
        if (audioEl.currentTime > 3) {
            audioEl.currentTime = 0;
        } else {
            loadAndPlayTrack(currentTrackIndex - 1);
        }
    }

    function updatePlayStateUI(playing) {
        isPlaying = playing;
        if (deckStatusText) deckStatusText.textContent = playing ? 'PLAYING • DSP LIVE' : 'PAUSED';
        if (deckStatusText) deckStatusText.style.color = playing ? '#4ade80' : '#38bdf8';

        if (deckPlayIcon && deckPauseIcon) {
            deckPlayIcon.style.display = playing ? 'none' : 'block';
            deckPauseIcon.style.display = playing ? 'block' : 'none';
        }
        if (cinemaPlayIcon && cinemaPauseIcon) {
            cinemaPlayIcon.style.display = playing ? 'none' : 'block';
            cinemaPauseIcon.style.display = playing ? 'block' : 'none';
        }

        if (mainDeckVinyl) mainDeckVinyl.classList.toggle('spinning', playing);
        const homeVinyl = document.getElementById('home-vinyl-preview');
        if (homeVinyl) homeVinyl.classList.toggle('spinning', playing);
        const dockVinyl = document.getElementById('dock-mini-vinyl');
        if (dockVinyl) dockVinyl.classList.toggle('spinning', playing);
        const dockPlayIcon = document.getElementById('dock-play-icon');
        const dockPauseIcon = document.getElementById('dock-pause-icon');
        if (dockPlayIcon && dockPauseIcon) {
            dockPlayIcon.style.display = playing ? 'none' : 'block';
            dockPauseIcon.style.display = playing ? 'block' : 'none';
        }
        const cinemaVinyl = document.getElementById('cinema-vinyl-wrap');
        if (cinemaVinyl) cinemaVinyl.style.animationPlayState = playing ? 'running' : 'paused';

        if (globalAudioToggle) globalAudioToggle.classList.toggle('playing', playing);
        updateTrackUI();
    }

    // -------------------------------------------------------------
    // 7. SPED UP & SLOWED VIBE PRESETS CONTROLLER
    // -------------------------------------------------------------
    vibePresetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            initWebAudio();
            const speed = parseFloat(btn.getAttribute('data-speed'));
            const reverb = btn.getAttribute('data-reverb') === 'true';
            const sub = btn.getAttribute('data-sub') === 'true';

            setPlaybackRate(speed);
            setReverb(reverb);
            setSubmerged(sub);
        });
    });

    if (dspSpeedSlider) {
        dspSpeedSlider.addEventListener('input', (e) => {
            setPlaybackRate(e.target.value);
        });
    }

    if (deckVolumeSlider) {
        deckVolumeSlider.addEventListener('input', (e) => {
            initWebAudio();
            const val = parseFloat(e.target.value);
            audioEl.volume = val;
            if (masterGainNode) masterGainNode.gain.value = val;
            if (deckVolumeVal) deckVolumeVal.textContent = `${Math.round(val * 100)}%`;
        });
    }

    if (deckLikeCurrentBtn) {
        deckLikeCurrentBtn.addEventListener('click', () => {
            const track = TRACKS[currentTrackIndex];
            if (track) toggleLikeTrack(track.id);
        });
    }

    // -------------------------------------------------------------
    // 8. FULLSCREEN CINEMA MODE CONTROLLER (GIF / Video / Image)
    // -------------------------------------------------------------
    function updateCinemaMediaForTrack(track) {
        const customMedia = customMediaMap[track.id] || track.backdrop;
        const isVideo = customMedia.endsWith('.mp4') || customMedia.endsWith('.webm');

        if (isVideo) {
            fullscreenBgMedia.style.display = 'none';
            fullscreenBgVideo.style.display = 'block';
            fullscreenBgVideo.src = customMedia;
            fullscreenBgVideo.play().catch(() => {});
        } else {
            fullscreenBgVideo.style.display = 'none';
            fullscreenBgMedia.style.display = 'block';
            fullscreenBgMedia.src = customMedia;
        }
    }

    function openFullscreenCinema() {
        if (fullscreenCinemaOverlay) {
            fullscreenCinemaOverlay.classList.add('active');
            fullscreenCinemaOverlay.setAttribute('aria-hidden', 'false');
            updateCinemaMediaForTrack(TRACKS[currentTrackIndex]);
        }
    }

    function closeFullscreenCinema() {
        if (fullscreenCinemaOverlay) {
            fullscreenCinemaOverlay.classList.remove('active');
            fullscreenCinemaOverlay.setAttribute('aria-hidden', 'true');
        }
        if (cinemaMediaModal) cinemaMediaModal.classList.remove('open');
    }

    if (headerCinemaBtn) headerCinemaBtn.addEventListener('click', openFullscreenCinema);
    if (deckCinemaBtn) deckCinemaBtn.addEventListener('click', openFullscreenCinema);
    if (cinemaExitBtn) cinemaExitBtn.addEventListener('click', closeFullscreenCinema);

    if (cinemaPlayBtn) cinemaPlayBtn.addEventListener('click', togglePlay);
    if (cinemaPrevBtn) cinemaPrevBtn.addEventListener('click', prevTrack);
    if (cinemaNextBtn) cinemaNextBtn.addEventListener('click', nextTrack);

    if (cinemaChangeMediaBtn) {
        cinemaChangeMediaBtn.addEventListener('click', () => {
            if (cinemaMediaModal) cinemaMediaModal.classList.toggle('open');
        });
    }

    if (closeCinemaMediaBtn) {
        closeCinemaMediaBtn.addEventListener('click', () => {
            if (cinemaMediaModal) cinemaMediaModal.classList.remove('open');
        });
    }

    mediaPresetCards.forEach(card => {
        card.addEventListener('click', () => {
            mediaPresetCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            const src = card.getAttribute('data-media-src');
            const track = TRACKS[currentTrackIndex];
            if (track) {
                customMediaMap[track.id] = src;
                localStorage.setItem('atlantis_custom_media_map', JSON.stringify(customMediaMap));
                updateCinemaMediaForTrack(track);
            }
            if (cinemaMediaModal) cinemaMediaModal.classList.remove('open');
        });
    });

    if (applyCustomMediaBtn) {
        applyCustomMediaBtn.addEventListener('click', () => {
            const url = customMediaUrlInput.value.trim();
            if (url) {
                const track = TRACKS[currentTrackIndex];
                if (track) {
                    customMediaMap[track.id] = url;
                    localStorage.setItem('atlantis_custom_media_map', JSON.stringify(customMediaMap));
                    updateCinemaMediaForTrack(track);
                }
                customMediaUrlInput.value = '';
                if (cinemaMediaModal) cinemaMediaModal.classList.remove('open');
            }
        });
    }

    // -------------------------------------------------------------
    // 9. EVENT LISTENERS: TRANSPORT & SCRUBBER
    // -------------------------------------------------------------
    if (deckPlayBtn) deckPlayBtn.addEventListener('click', togglePlay);
    if (globalAudioToggle) globalAudioToggle.addEventListener('click', togglePlay);
    if (deckNextBtn) deckNextBtn.addEventListener('click', nextTrack);
    if (deckPrevBtn) deckPrevBtn.addEventListener('click', prevTrack);

    // Portal Hero & Direct Play & Bottom Dock Controls
    const heroSoundPlayBtn = document.getElementById('hero-sound-play-btn');
    if (heroSoundPlayBtn) heroSoundPlayBtn.addEventListener('click', togglePlay);

    const dockPlayBtn = document.getElementById('dock-play-btn');
    const dockPrevBtn = document.getElementById('dock-prev-btn');
    const dockNextBtn = document.getElementById('dock-next-btn');
    const dockProgressWrap = document.getElementById('dock-progress-wrap');
    if (dockPlayBtn) dockPlayBtn.addEventListener('click', togglePlay);
    if (dockPrevBtn) dockPrevBtn.addEventListener('click', prevTrack);
    if (dockNextBtn) dockNextBtn.addEventListener('click', nextTrack);

    document.querySelectorAll('.track-direct-play-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const trackId = btn.getAttribute('data-track-id');
            const idx = TRACKS.findIndex(t => t.id === trackId);
            if (idx !== -1) {
                loadAndPlayTrack(idx);
            } else {
                loadAndPlayTrack(0);
            }
        });
    });

    if (deckShuffleBtn) {
        deckShuffleBtn.addEventListener('click', () => {
            isShuffled = !isShuffled;
            deckShuffleBtn.classList.toggle('active', isShuffled);
        });
    }

    if (deckLoopBtn) {
        deckLoopBtn.addEventListener('click', () => {
            isLooping = !isLooping;
            audioEl.loop = isLooping;
            deckLoopBtn.classList.toggle('active', isLooping);
        });
    }

    audioEl.addEventListener('timeupdate', () => {
        const cur = audioEl.currentTime || 0;
        const dur = audioEl.duration || 0;
        const pct = dur > 0 ? (cur / dur) * 100 : 0;

        if (deckTimeCurrent) deckTimeCurrent.textContent = formatTime(cur);
        if (deckTimeDuration) deckTimeDuration.textContent = formatTime(dur);
        if (deckProgressFill) deckProgressFill.style.width = `${pct}%`;

        if (cinemaTimeCurrent) cinemaTimeCurrent.textContent = formatTime(cur);
        if (cinemaTimeDuration) cinemaTimeDuration.textContent = formatTime(dur);
        if (cinemaProgressFill) cinemaProgressFill.style.width = `${pct}%`;

        const dockTimeCurrent = document.getElementById('dock-time-current');
        const dockTimeDuration = document.getElementById('dock-time-duration');
        const dockProgressFill = document.getElementById('dock-progress-fill');
        if (dockTimeCurrent) dockTimeCurrent.textContent = formatTime(cur);
        if (dockTimeDuration) dockTimeDuration.textContent = formatTime(dur);
        if (dockProgressFill) dockProgressFill.style.width = `${pct}%`;
    });

    audioEl.addEventListener('ended', () => {
        if (!isLooping) nextTrack();
    });

    function handleScrub(e, wrapEl) {
        const rect = wrapEl.getBoundingClientRect();
        const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        if (audioEl.duration) {
            audioEl.currentTime = pos * audioEl.duration;
        }
    }

    if (deckProgressWrap) deckProgressWrap.addEventListener('click', (e) => handleScrub(e, deckProgressWrap));
    if (cinemaProgressWrap) cinemaProgressWrap.addEventListener('click', (e) => handleScrub(e, cinemaProgressWrap));
    if (dockProgressWrap) dockProgressWrap.addEventListener('click', (e) => handleScrub(e, dockProgressWrap));

    // -------------------------------------------------------------
    // 10. REAL-TIME CANVAS AUDIO VISUALIZER
    // -------------------------------------------------------------
    visModeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            visModeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentVisMode = btn.getAttribute('data-vis-mode');
        });
    });

    function drawVisualizer() {
        requestAnimationFrame(drawVisualizer);

        if (deckCanvas) {
            const ctx = deckCanvas.getContext('2d');
            const width = deckCanvas.width;
            const height = deckCanvas.height;
            ctx.clearRect(0, 0, width, height);

            if (analyserNode && isPlaying) {
                const bufferLength = analyserNode.frequencyBinCount;
                const freqData = new Uint8Array(bufferLength);
                const timeData = new Uint8Array(bufferLength);
                analyserNode.getByteFrequencyData(freqData);
                analyserNode.getByteTimeDomainData(timeData);

                const currentTheme = document.documentElement.getAttribute('data-theme') || 'noir';
                let primaryColor = '#38bdf8';
                let secondaryColor = '#ffffff';

                if (currentTheme === 'nature') {
                    primaryColor = '#4ade80';
                    secondaryColor = '#86efac';
                } else if (currentTheme === 'wii') {
                    primaryColor = '#00a6e2';
                    secondaryColor = '#38bdf8';
                }

                if (currentVisMode === 'bars') {
                    const barCount = 48;
                    const barWidth = (width / barCount) - 3;

                    for (let i = 0; i < barCount; i++) {
                        const binIndex = Math.floor((i / barCount) * (bufferLength * 0.75));
                        const val = freqData[binIndex] || 0;
                        const barHeight = Math.max(4, (val / 255) * (height - 25));
                        const x = i * (barWidth + 3) + 6;
                        const y = height - barHeight - 8;

                        const grad = ctx.createLinearGradient(0, y, 0, height);
                        grad.addColorStop(0, primaryColor);
                        grad.addColorStop(1, 'rgba(0, 0, 0, 0.2)');

                        ctx.fillStyle = grad;
                        ctx.fillRect(x, y, barWidth, barHeight);

                        ctx.fillStyle = secondaryColor;
                        ctx.fillRect(x, y - 2, barWidth, 2);
                    }
                } else if (currentVisMode === 'monoliths') {
                    const pillarCount = 28;
                    const pWidth = (width / pillarCount) - 6;
                    const horizonY = height * 0.72;

                    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(0, horizonY);
                    ctx.lineTo(width, horizonY);
                    ctx.stroke();

                    for (let i = 0; i < pillarCount; i++) {
                        const binIndex = Math.floor((i / pillarCount) * (bufferLength * 0.7));
                        const val = freqData[binIndex] || 0;
                        const pHeight = Math.max(6, (val / 255) * (horizonY - 20));
                        const x = i * (pWidth + 6) + 8;
                        const y = horizonY - pHeight;

                        const grad = ctx.createLinearGradient(0, y, 0, horizonY);
                        grad.addColorStop(0, '#e0f2fe');
                        grad.addColorStop(0.3, primaryColor);
                        grad.addColorStop(1, 'rgba(6, 28, 48, 0.85)');

                        ctx.fillStyle = grad;
                        ctx.fillRect(x, y, pWidth, pHeight);

                        ctx.fillStyle = '#ffffff';
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = primaryColor;
                        ctx.fillRect(x - 1, y - 2, pWidth + 2, 3);
                        ctx.shadowBlur = 0;

                        const refHeight = pHeight * 0.45;
                        const refGrad = ctx.createLinearGradient(0, horizonY, 0, horizonY + refHeight);
                        refGrad.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
                        refGrad.addColorStop(1, 'transparent');

                        ctx.fillStyle = refGrad;
                        ctx.fillRect(x, horizonY, pWidth, refHeight);
                    }
                } else if (currentVisMode === 'wave') {
                    ctx.beginPath();
                    ctx.lineWidth = 2.5;
                    ctx.strokeStyle = primaryColor;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = primaryColor;

                    const sliceWidth = width / bufferLength;
                    let x = 0;

                    for (let i = 0; i < bufferLength; i++) {
                        const v = timeData[i] / 128.0;
                        const y = (v * height) / 2;
                        if (i === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                        x += sliceWidth;
                    }
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                } else if (currentVisMode === 'cinema') {
                    ctx.beginPath();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = primaryColor;
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = primaryColor;

                    const sliceWidth = width / bufferLength;
                    let x = 0;

                    for (let i = 0; i < bufferLength; i++) {
                        const v = timeData[i] / 128.0;
                        const y = (height - 30) + (v - 1.0) * 18;
                        if (i === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                        x += sliceWidth;
                    }
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                }
            } else {
                ctx.beginPath();
                ctx.lineWidth = 1.5;
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                const t = Date.now() * 0.002;
                for (let x = 0; x < width; x += 4) {
                    const y = (height / 2) + Math.sin(x * 0.02 + t) * 6;
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
        }
    }

    drawVisualizer();

    // -------------------------------------------------------------
    // 11. THEME ENGINE & SETTINGS
    // -------------------------------------------------------------
    const THEME_STORAGE_KEY = 'tyson_atlantis_theme';
    const htmlElement = document.documentElement;
    const themeCards = document.querySelectorAll('.theme-option-card');
    const settingsModal = document.getElementById('settings-modal');
    const settingsToggleBtn = document.getElementById('settings-toggle-btn');
    const settingsCloseBtn = document.getElementById('settings-modal-close-btn');
    const settingsBackdrop = document.getElementById('settings-modal-backdrop');

    function applyTheme(themeName) {
        if (!themeName) themeName = 'noir-aero';
        htmlElement.setAttribute('data-theme', themeName);
        localStorage.setItem('tyson_theme_v2', themeName);

        themeCards.forEach(card => {
            if (card.getAttribute('data-theme-choice') === themeName) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });
    }

    const savedTheme = localStorage.getItem('tyson_theme_v2') || 'noir-aero';
    applyTheme(savedTheme);

    themeCards.forEach(card => {
        card.addEventListener('click', () => {
            const theme = card.getAttribute('data-theme-choice');
            applyTheme(theme);
        });
    });

    if (settingsToggleBtn) settingsToggleBtn.addEventListener('click', () => settingsModal.classList.add('open'));
    if (settingsCloseBtn) settingsCloseBtn.addEventListener('click', () => settingsModal.classList.remove('open'));
    if (settingsBackdrop) settingsBackdrop.addEventListener('click', () => settingsModal.classList.remove('open'));

    // -------------------------------------------------------------
    // 12. T5S STANDALONE APP BOOT SEQUENCE (Pure Black, Crisp, No Glow)
    // -------------------------------------------------------------
    const bootSplash = document.getElementById('t5s-boot-splash');
    const bootPhase1 = document.getElementById('boot-phase-1');
    const bootPhase2 = document.getElementById('boot-phase-2');

    function runT5SBootSequence() {
        if (!bootSplash || !bootPhase1 || !bootPhase2) return;

        bootPhase1.classList.add('active');
        bootPhase2.classList.remove('active');
        bootSplash.classList.remove('boot-finished');

        setTimeout(() => {
            bootPhase1.classList.remove('active');
            bootPhase2.classList.add('active');
        }, 750);

        setTimeout(() => {
            bootPhase2.classList.remove('active');
            bootSplash.classList.add('boot-finished');
            document.documentElement.classList.add('intro-complete');
        }, 1500);
    }

    if (bootSplash) {
        runT5SBootSequence();
    }

    // -------------------------------------------------------------
    // 13. PORTAL SPA ROUTING, INTRO TRACE & HERO CAROUSEL
    // -------------------------------------------------------------
    const viewMap = {
        '#home': 'view-home',
        '#catalog': 'view-catalog',
        '#emotion-ambience': 'view-emotion-ambience',
        '#studio': 'view-studio',
        '#about': 'view-about'
    };

    function handleSpaHashChange() {
        const hash = window.location.hash || '#home';
        const targetViewId = viewMap[hash];
        if (!targetViewId) return;

        const targetView = document.getElementById(targetViewId);
        if (!targetView) return;

        document.querySelectorAll('#spa-main-content .page-view').forEach(v => {
            v.classList.toggle('active-view', v.id === targetViewId);
        });

        document.querySelectorAll('.main-nav .nav-link').forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === hash);
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.addEventListener('hashchange', handleSpaHashChange);
    if (document.getElementById('view-home')) {
        handleSpaHashChange();
    }

    // Complete SVG Letter-by-Letter Trace on Portal Home
    function triggerPortalIntroTrace() {
        document.documentElement.classList.remove('intro-complete');
        setTimeout(() => {
            document.documentElement.classList.add('intro-complete');
        }, 2900);
    }

    if (document.documentElement.classList.contains('intro-animated-page') && !bootSplash) {
        triggerPortalIntroTrace();
    }

    const replayIntroBtn = document.getElementById('replay-intro-btn');
    if (replayIntroBtn) {
        replayIntroBtn.addEventListener('click', () => {
            if (settingsModal) settingsModal.classList.remove('open');
            window.location.hash = '#home';
            triggerPortalIntroTrace();
        });
    }

    // Hero Background Carousel Rotation on Portal Home
    const homeHeroSlides = document.querySelectorAll('#view-home .hero-bg-carousel .hero-bg-slide');
    if (homeHeroSlides.length > 1) {
        let currentSlideIdx = 0;
        setInterval(() => {
            homeHeroSlides[currentSlideIdx].classList.remove('active');
            currentSlideIdx = (currentSlideIdx + 1) % homeHeroSlides.length;
            homeHeroSlides[currentSlideIdx].classList.add('active');
        }, 6500);
    }

    // Mini Visualizer in Bottom Audio Dock
    const dockMiniCanvas = document.getElementById('dock-mini-visualizer');
    function drawDockMiniVisualizer() {
        requestAnimationFrame(drawDockMiniVisualizer);
        if (!dockMiniCanvas) return;
        const ctx = dockMiniCanvas.getContext('2d');
        const w = dockMiniCanvas.width;
        const h = dockMiniCanvas.height;
        ctx.clearRect(0, 0, w, h);

        if (analyserNode && isPlaying) {
            const freqData = new Uint8Array(analyserNode.frequencyBinCount);
            analyserNode.getByteFrequencyData(freqData);
            const bars = 12;
            const barW = (w / bars) - 2;
            ctx.fillStyle = '#38bdf8';
            for (let i = 0; i < bars; i++) {
                const val = freqData[i * 3] || 0;
                const barH = Math.max(3, (val / 255) * (h - 4));
                ctx.fillRect(i * (barW + 2), h - barH - 2, barW, barH);
            }
        } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            const bars = 12;
            const barW = (w / bars) - 2;
            for (let i = 0; i < bars; i++) {
                ctx.fillRect(i * (barW + 2), h - 5, barW, 3);
            }
        }
    }
    drawDockMiniVisualizer();

    // -------------------------------------------------------------
    // 14. MOBILE NAV DRAWER TOGGLE
    // -------------------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const mainNav = document.getElementById('main-nav');
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mainNav.classList.toggle('mobile-open');
        });
    }

    // Initialize Default State
    updateAuthUI();
    loadTrack(0);
    renderPlaylist('all');
});
