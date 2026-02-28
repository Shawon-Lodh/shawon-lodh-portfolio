// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Navbar Effect
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('open');
        });

        navLinksContainer.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => navLinksContainer.classList.remove('open'));
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinksContainer.classList.remove('open');
            }
        });
    }

    // 2. Typing Animation
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    const textArray = [
        "Mobile App Developer",
        "Fintech Specialist",
        "Flutter Architect",
        "Problem Solver"
    ];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if (textArray.length) {
        // Start animation after a short delay
        setTimeout(type, 1000);
    }

    // 3. Scroll Reveal Animation
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");

        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 100; // when to trigger

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }

    window.addEventListener("scroll", reveal);

    // Trigger once on load
    reveal();

    // 3.5 Accordion Logic
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            accordionItems.forEach(acc => {
                acc.classList.remove('active');
                acc.querySelector('.accordion-body').style.maxHeight = null;
            });

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                const body = item.querySelector('.accordion-body');
                body.style.maxHeight = body.scrollHeight + "px";
            }
        });
    });

    // Set initial height for active accordion
    const activeAccordion = document.querySelector('.accordion-item.active .accordion-body');
    if (activeAccordion) {
        activeAccordion.style.maxHeight = activeAccordion.scrollHeight + "px";
    }

    // 3.6 Skill Bar Animation
    const skillFills = document.querySelectorAll('.skill-fill');
    function animateSkills() {
        skillFills.forEach(fill => {
            const fillTop = fill.getBoundingClientRect().top;
            if (fillTop < window.innerHeight - 50) {
                fill.style.width = fill.getAttribute('data-width');
            }
        });
    }
    window.addEventListener('scroll', animateSkills);
    animateSkills();

    // 4. Project Filtering logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    function openProjectDetails(card) {
        const projectSlug = card.getAttribute('data-project');
        if (!projectSlug) return;
        window.location.href = `project-details.html?project=${encodeURIComponent(projectSlug)}`;
    }

    projectCards.forEach(card => {
        const projectSlug = card.getAttribute('data-project');
        if (!projectSlug) return;

        card.classList.add('clickable-project-card');
        card.setAttribute('role', 'link');
        card.setAttribute('tabindex', '0');

        const projectTitleEl = card.querySelector('.project-title');
        const projectTitle = projectTitleEl ? projectTitleEl.textContent.trim() : 'project';
        card.setAttribute('aria-label', `Open details for ${projectTitle}`);

        card.addEventListener('click', (event) => {
            // Keep original behavior for explicit links like Play Store/App Store.
            if (event.target.closest('a, button')) return;
            openProjectDetails(card);
        });

        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openProjectDetails(card);
            }
        });
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    // Re-trigger reveal animation for smoothness
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 50);
                } else {
                    card.style.display = 'none';
                    card.style.opacity = "0";
                }
            });
        });
    });

    // 5. Active Nav Link on Scroll
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // 6. Chess.com API Integration
    const chessUsername = 'shawonlodh25';
    const chessStatsContainer = document.getElementById('chess-stats-container');

    if (chessStatsContainer) {
        fetch(`https://api.chess.com/pub/player/${chessUsername}/stats`)
            .then(res => res.json())
            .then(data => {
                const rapid = data.chess_rapid || {};
                const rapidLast = rapid.last ? rapid.last.rating : 'N/A';
                const rapidRecord = rapid.record || { win: 0, loss: 0, draw: 0 };
                const totalRapid = rapidRecord.win + rapidRecord.loss + rapidRecord.draw;
                const winPct = totalRapid > 0 ? (rapidRecord.win / totalRapid * 100).toFixed(0) : 0;
                const drawPct = totalRapid > 0 ? (rapidRecord.draw / totalRapid * 100).toFixed(0) : 0;
                const lossPct = totalRapid > 0 ? (rapidRecord.loss / totalRapid * 100).toFixed(0) : 0;

                const tactics = data.tactics || {};
                const puzzleHighest = tactics.highest ? tactics.highest.rating : 'N/A';

                chessStatsContainer.innerHTML = `
                    <div class="chess-stat-box">
                        <i class="fas fa-chess-board stat-icon" style="color: #81b64c;"></i>
                        <div class="stat-name">Rapid Rating</div>
                        <div class="stat-value counter" data-target="${rapidLast}">0</div>
                        <div class="stat-desc">Current Elo</div>
                    </div>
                    <div class="chess-stat-box">
                        <i class="fas fa-puzzle-piece stat-icon" style="color: #3b82f6;"></i>
                        <div class="stat-name">Puzzles</div>
                        <div class="stat-value counter" data-target="${puzzleHighest}">0</div>
                        <div class="stat-desc">Highest Rating</div>
                    </div>
                    <div class="chess-stat-box">
                        <i class="fas fa-trophy stat-icon" style="color: #f59e0b;"></i>
                        <div class="stat-name">Rapid Win Rate</div>
                        <div class="stat-value counter" data-target="${winPct}">0<span style="font-size: 1.2rem">%</span></div>
                        <div class="stat-desc">out of ${totalRapid} games</div>
                        <div class="wdl-bar">
                            <div class="wdl-w" style="width: ${winPct}%" title="${rapidRecord.win} Wins"></div>
                            <div class="wdl-d" style="width: ${drawPct}%" title="${rapidRecord.draw} Draws"></div>
                            <div class="wdl-l" style="width: ${lossPct}%" title="${rapidRecord.loss} Losses"></div>
                        </div>
                    </div>
                `;

                // Animate counters
                const counters = document.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        // Extract number only from innerText to avoid parsing `%`
                        const count = +counter.innerText.replace(/[^0-9]/g, '');

                        const inc = target / 50;

                        if (count < target) {
                            if (counter.innerHTML.includes('%')) {
                                counter.innerHTML = Math.ceil(count + inc) + '<span style="font-size: 1.2rem">%</span>';
                            } else {
                                counter.innerText = Math.ceil(count + inc);
                            }
                            setTimeout(updateCount, 30);
                        } else {
                            if (counter.innerHTML.includes('%')) {
                                counter.innerHTML = target + '<span style="font-size: 1.2rem">%</span>';
                            } else {
                                counter.innerText = target;
                            }
                        }
                    };
                    updateCount();
                });
            })
            .catch(err => {
                chessStatsContainer.innerHTML = `<div style="text-align: center; width: 100%; color: var(--text-muted);">Failed to load live stats.</div>`;
                console.error("Chess API Error:", err);
            });
    }

    // 7. LeetCode API Integration (using public alfa-leetcode-api)
    const leetcodeUsername = 'shawonlodh';
    const leetcodeStatsContainer = document.getElementById('leetcode-stats-container');

    // Shared Animation Function for Numbers
    function animateCounters(container) {
        const counters = container.querySelectorAll('.counter');
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/[^0-9]/g, '');
                const inc = target / 50;

                if (count < target) {
                    if (counter.innerHTML.includes('%')) {
                        counter.innerHTML = Math.ceil(count + inc) + '<span style="font-size: 1.2rem">%</span>';
                    } else {
                        counter.innerText = Math.ceil(count + inc);
                    }
                    setTimeout(updateCount, 30);
                } else {
                    if (counter.innerHTML.includes('%')) {
                        counter.innerHTML = target + '<span style="font-size: 1.2rem">%</span>';
                    } else {
                        counter.innerText = target;
                    }
                }
            };
            updateCount();
        });
    }

    if (leetcodeStatsContainer) {
        fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeUsername}/solved`)
            .then(res => res.json())
            .then(data => {
                const totalSolved = data.solvedProblem || 0;
                const totalQuestions = data.allQuestionsCount ? data.allQuestionsCount[0].count : 3000;
                const solvePct = totalQuestions > 0 ? (totalSolved / totalQuestions * 100).toFixed(1) : 0;

                const easySolved = data.easySolved || 0;
                const mediumSolved = data.mediumSolved || 0;
                const hardSolved = data.hardSolved || 0;

                const easyPct = totalSolved > 0 ? (easySolved / totalSolved * 100).toFixed(0) : 0;
                const mediumPct = totalSolved > 0 ? (mediumSolved / totalSolved * 100).toFixed(0) : 0;
                const hardPct = totalSolved > 0 ? (hardSolved / totalSolved * 100).toFixed(0) : 0;

                leetcodeStatsContainer.innerHTML = `
                    <div class="stat-box">
                        <i class="fas fa-check-circle stat-icon" style="color: #ffa116;"></i>
                        <div class="stat-name">Total Solved</div>
                        <div class="stat-value counter" data-target="${totalSolved}">0</div>
                        <div class="stat-desc">Problems Conquered</div>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-chart-pie stat-icon" style="color: #3b82f6;"></i>
                        <div class="stat-name">Completion Rate</div>
                        <div class="stat-value counter" data-target="${solvePct}">0<span style="font-size: 1.2rem">%</span></div>
                        <div class="stat-desc">out of total dataset</div>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-layer-group stat-icon" style="color: #10b981;"></i>
                        <div class="stat-name">Difficulty Split</div>
                        <div class="stat-value" style="font-size: 1.2rem; margin-top: 15px;">
                            <span style="color: #00b8a3;">${easySolved} Easy</span><br>
                            <span style="color: #ffc01e;">${mediumSolved} Med</span><br>
                            <span style="color: #ff375f;">${hardSolved} Hard</span>
                        </div>
                        <div class="wdl-bar">
                            <div class="lc-e" style="width: ${easyPct}%" title="${easySolved} Easy"></div>
                            <div class="lc-m" style="width: ${mediumPct}%" title="${mediumSolved} Medium"></div>
                            <div class="lc-h" style="width: ${hardPct}%" title="${hardSolved} Hard"></div>
                        </div>
                    </div>
                `;
                animateCounters(leetcodeStatsContainer);
            })
            .catch(err => {
                leetcodeStatsContainer.innerHTML = `<div style="text-align: center; width: 100%; color: var(--text-muted); grid-column: 1 / -1;">Failed to load live stats.</div>`;
                console.error("LeetCode API Error:", err);
            });
    }

    // 8. StackOverflow API Integration
    const soUserId = '17956869';
    const soStatsContainer = document.getElementById('stackoverflow-stats-container');

    if (soStatsContainer) {
        fetch(`https://api.stackexchange.com/2.3/users/${soUserId}?site=stackoverflow`)
            .then(res => res.json())
            .then(data => {
                if (data && data.items && data.items.length > 0) {
                    const user = data.items[0];
                    const rep = user.reputation;
                    const badges = user.badge_counts;
                    const totalBadges = badges.bronze + badges.silver + badges.gold;

                    const pGold = totalBadges > 0 ? (badges.gold / totalBadges * 100).toFixed(0) : 0;
                    const pSilver = totalBadges > 0 ? (badges.silver / totalBadges * 100).toFixed(0) : 0;
                    const pBronze = totalBadges > 0 ? (badges.bronze / totalBadges * 100).toFixed(0) : 0;

                    soStatsContainer.innerHTML = `
                        <div class="stat-box">
                            <i class="fab fa-stack-overflow stat-icon" style="color: #f48024;"></i>
                            <div class="stat-name">Reputation</div>
                            <div class="stat-value counter" data-target="${rep}">0</div>
                            <div class="stat-desc">Community Trust</div>
                        </div>
                        <div class="stat-box">
                            <i class="fas fa-medal stat-icon" style="color: #8c8c88;"></i>
                            <div class="stat-name">Total Badges</div>
                            <div class="stat-value counter" data-target="${totalBadges}">0</div>
                            <div class="stat-desc">Earned</div>
                        </div>
                        <div class="stat-box">
                            <i class="fas fa-award stat-icon" style="color: #f1b600;"></i>
                            <div class="stat-name">Badge Split</div>
                            <div class="stat-value" style="font-size: 1.2rem; margin-top: 15px;">
                                <span style="color: #f1b600;">${badges.gold} Gold</span><br>
                                <span style="color: #9a9c9f;">${badges.silver} Silver</span><br>
                                <span style="color: #cabb98;">${badges.bronze} Bronze</span>
                            </div>
                            <div class="wdl-bar">
                                <div class="so-gold" style="width: ${pGold}%" title="${badges.gold} Gold"></div>
                                <div class="so-silver" style="width: ${pSilver}%" title="${badges.silver} Silver"></div>
                                <div class="so-bronze" style="width: ${pBronze}%" title="${badges.bronze} Bronze"></div>
                            </div>
                        </div>
                    `;
                    animateCounters(soStatsContainer);
                } else {
                    soStatsContainer.innerHTML = `<div style="text-align: center; width: 100%; color: var(--text-muted); grid-column: 1 / -1;">No user data found.</div>`;
                }
            })
            .catch(err => {
                soStatsContainer.innerHTML = `<div style="text-align: center; width: 100%; color: var(--text-muted); grid-column: 1 / -1;">Failed to load live stats.</div>`;
                console.error("StackOverflow API Error:", err);
            });
    }

    // 9. Duolingo API Integration
    const duolingoUsername = 'shawonlodh';
    const duolingoStatsContainer = document.getElementById('duolingo-stats-container');

    if (duolingoStatsContainer) {
        // We use codetabs proxy as Duolingo API doesn't support CORS for browser requests directly
        // This proxy reliably returns JSON instead of Cloudflare HTML challenge pages
        fetch(`https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent('https://www.duolingo.com/2017-06-30/users?username=' + duolingoUsername)}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.users && data.users.length > 0) {
                    const user = data.users[0];
                    const totalXp = user.totalXp || 0;
                    const streak = user.streak || 0;
                    const courses = user.courses || [];

                    // Generate HTML for each course the user is learning
                    let coursesHtml = '';
                    if (courses.length > 0) {
                        courses.forEach(course => {
                            if (course.xp > 0) {
                                coursesHtml += `
                                    <div class="stat-box" style="padding: 15px 10px; border: 1px solid rgba(88, 204, 2, 0.2);">
                                        <div class="stat-name" style="color: var(--text-primary); margin-bottom: 5px; font-size: 1.1rem;">${course.title}</div>
                                        <div class="wdl-bar" style="margin-top: 5px; margin-bottom: 12px; height: 3px;">
                                            <div class="wdl-w" style="width: 100%; background: #58cc02;"></div>
                                        </div>
                                        <div style="display: flex; justify-content: space-around; font-size: 0.85rem; color: var(--text-muted);">
                                            <span><i class="fas fa-star" style="color: #ffc800; margin-right: 4px;"></i> ${course.xp} XP</span>
                                            <span><i class="fas fa-crown" style="color: #ffc800; margin-right: 4px;"></i> ${course.crowns || 0}</span>
                                        </div>
                                    </div>
                                `;
                            }
                        });
                    } else {
                        coursesHtml = `<div style="text-align: center; width: 100%; color: var(--text-muted); grid-column: 1 / -1; font-size: 0.9rem;">No active courses</div>`;
                    }

                    // Wrap the total stats + all courses in a comprehensive grid
                    duolingoStatsContainer.style.display = 'block'; // Override default grid
                    duolingoStatsContainer.innerHTML = `
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 25px;">
                            <div class="stat-box" style="padding: 20px 10px;">
                                <i class="fas fa-fire stat-icon" style="color: #ff9600; font-size: 1.8rem; margin-bottom: 15px;"></i>
                                <div class="stat-value counter" data-target="${streak}" style="font-size: 2.2rem;">0</div>
                                <div class="stat-desc" style="font-weight: 600;">Total Day Streak</div>
                            </div>
                            <div class="stat-box" style="padding: 20px 10px;">
                                <i class="fas fa-bolt stat-icon" style="color: #ffc800; font-size: 1.8rem; margin-bottom: 15px;"></i>
                                <div class="stat-value counter" data-target="${totalXp}" style="font-size: 2.2rem;">0</div>
                                <div class="stat-desc" style="font-weight: 600;">Total XP</div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">
                            <i class="fas fa-language" style="color: #58cc02; font-size: 1.2rem;"></i>
                            <span class="stat-name" style="margin-bottom: 0; font-size: 1.1rem; color: var(--text-primary);">Language Details</span>
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 15px;">
                            ${coursesHtml}
                        </div>
                    `;
                    animateCounters(duolingoStatsContainer);
                } else {
                    duolingoStatsContainer.innerHTML = `<div style="text-align: center; width: 100%; color: var(--text-muted); padding: 20px;">No user data found.</div>`;
                }
            })
            .catch(err => {
                duolingoStatsContainer.innerHTML = `<div style="text-align: center; width: 100%; color: var(--text-muted); padding: 20px;">Failed to load live stats.</div>`;
                console.error("Duolingo API Error:", err);
            });
    }
});
