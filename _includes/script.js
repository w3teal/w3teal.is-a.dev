(() => {
    const terminal = document.getElementById("terminal");
    const header = document.getElementById("header");
    const socialData = {
        web: {
            blog: "https://w3teal.bearblog.dev"
        },
        primary: {
            mstdn: "https://fosstodon.org/@w3teal",
            misskey: "https://quietplace.xyz/@w3teal",
            pleroma: "https://fgc.network/@w3teal",
            pixelfed: "https://pixelfed.social/w3teal"
        },
        dev: {
            github: "https://github.com/w3teal",
            gitlab: "https://gitlab.com/w3teal",
            codeberg: "https://codeberg.org/w3teal",
            codepen: "https://codepen.io/w3teal",
            devto: "https://dev.to/w3teal"
        },
        avoid: {
            ig: "https://instagram.com/w3teal/",
            threads: "https://threads.net/@w3teal",
            x: "https://x.com/w3teal"
        },
        media: {
            yt: "https://youtube.com/@w3teal1",
            twitch: "https://twitch.tv/w3teal",
            tiktok: "https://tiktok.com/@w3teal"
        },
        misc: {
            producthunt: "https://producthunt.com/@w3teal",
            hn: "https://news.ycombinator.com/user?id=w3teal"
        },
        contact: {
            reddit: "https://reddit.com/u/w3teal/",
            trello: "https://trello.com/w3teal",
            slack: "https://w3teal.slack.com/",
            gmail: "mailto:w3teal@gmail.com"
        }
    };
    const openMap = Object.values(socialData).reduce((acc, group) => Object.assign(acc, group), {});
    const commands = {
        help: `Usage:
help            Sorry, I can't help you.
clear           Remember all the sadness and frustation and let it go
bio             Any last words?
changelog       Chagelog 
fastfetch       To flexing arch basically
slashes         Slashes that available in my site
social          Me around the world around the world
open            Open link e.g. <slug | url | /path>
whoami          Who are you>???
    `,
        slashes: `Use open /path to open the url. e.g. open /ai

/ai         /blogroll   /colophon   /contact 
/defaults   /hello      /listed     /now 
/pfp        /uses 
    `,
        fastfetch: `      /\\          user@w3teal.is-a.dev
     /  \\         os      IUseArchBtw Linux x86_64
    /    \\        kernel  Linux 6.12.61-1-lts
   /      \\       host    VERCEL
  /   ,,   \\      pkgs    67 (pacman), 67 (flatpak-system), 67 (flatpak-user)
 /   |  |   \\     uptime  6h 7m
/_-''    ''-_\\    memory  6.58 GiB / 7.71 GiB (85%)
    `,
        bio: `I am a frontend developer from North Sumatra, Indonesia 
who loves solving hard problems in a light way. I love 
F(L)OSS software, especially the light ones!`,
        changelog: `1.0.0           North Sumatra coder W3Teal doesn't follow the usual tough and hardened stereotypes that come with coding. The guy isn't a wimp, but he's more interested in saying something thought-provoking than violent. 
                TLDR; Debut
1.0.1           Several years ago, W3Teal was GitHub's underdog. Today, he's dropping what's possibly the best personal website of the decade.
                TLDR; Use 11ty now; Add status.cafe widget`,
        open: `Usage: open <slug | url | /path>`,
        whoami: `You are a dreamer. beep bop        user`
    };
    let currentInput = null;

    function newPrompt() {
        const line = document.createElement("div");
        line.className = "line";
        line.innerHTML = `
<span class="prompt">[user@w3teal.is-a.dev ~]$</span>
<input type="text">
    `;
        terminal.appendChild(line);
        currentInput = line.querySelector("input");
        currentInput.focus();
        currentInput.addEventListener("keydown", e => {
            if (e.key !== "Enter") return;
            const cmd = currentInput.value.trim();
            currentInput.disabled = true;
            handleCommand(cmd);
        });
    }

    function handleCommand(cmd) {
        if (!cmd) {
            newPrompt();
            return;
        }
        if (cmd === "clear") {
            terminal.innerHTML = "";
            if (header) header.remove();
            newPrompt();
            return;
        }
        if (cmd === "social") {
            renderSocial();
            newPrompt();
            return;
        }
        if (cmd.startsWith("open ")) {
            const target = cmd.slice(5).trim();
            if (openMap[target]) {
                window.open(openMap[target], "_blank");
            } else if (/^https?:\/\//.test(target)) {
                window.open(target, "_blank");
            } else if (target.startsWith("/")) {
                window.location.href = target;
            } else {
                printError(`cannot open: ${target}`);
            }
            newPrompt();
            return;
        }
        if (commands[cmd]) {
            printOutput(commands[cmd]);
            newPrompt();
            return;
        }
        printError(`command not found: ${cmd}`);
        newPrompt();
    }

    function renderSocial() {
        let text = "Use open <slug> to open the url. e.g. open mstdn\n\n";
        for (const category in socialData) {
            text += category + "\n";
            for (const slug in socialData[category]) {
                text += `    ${slug.padEnd(10)} ${socialData[category][slug]}\n`;
            }
        }
        printOutput(text);
    }

    function printOutput(text) {
        const out = document.createElement("div");
        out.className = "output";
        out.textContent = text.trimEnd();
        terminal.appendChild(out);
    }

    function printError(text) {
        const out = document.createElement("div");
        out.className = "output error";
        out.textContent = text;
        terminal.appendChild(out);
    }
    document.addEventListener("keydown", e => {
        if (currentInput && !currentInput.disabled && e.key.length === 1) {
            currentInput.focus();
        }
    });
    newPrompt();
})();