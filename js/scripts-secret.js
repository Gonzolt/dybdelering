document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('userInput');
    const output = document.querySelector('.output');
    const terminalBody = document.querySelector('.terminal-body');
    let awaitingPassword = false; // Flag for password prompt
    let riddleStep = 0; // Track progress in the riddle puzzle
    const secretPassword = 'monkey'; // Final password

    // Function to focus on userInput field
    function focusUserInput() {
        userInput.focus();
    }

    // Initial focus on page load
    focusUserInput();

    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const command = userInput.value.trim();
            const response = processCommand(command);

            if (command) {
                // Create a new div element for the command entered
                const commandOutput = document.createElement('div');
                commandOutput.classList.add('command-line');
                commandOutput.textContent = `> ${command}`;
                output.appendChild(commandOutput); // Append command to output
            }

            userInput.value = '';
            focusUserInput(); // Keep focus on input field after enter

            if (response) {
                // Create a new div element for the response
                const responseOutput = document.createElement('div');
                responseOutput.classList.add('response-line');
                output.appendChild(responseOutput); // Append response to output
                animateTypeOut(responseOutput, response); // Trigger typing animation for response
            }

            // Scroll to the bottom after each command and response
            setTimeout(() => {
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }, 50);
        }
    });

    function processCommand(command) {
        const cmd = command.toLowerCase();

        // If awaiting password for secret, handle password input
        if (awaitingPassword) {
            awaitingPassword = false; // Reset flag
            if (cmd === secretPassword) {
                return ' You solved the puzzle and unlocked the secret easter egg, congratulations!';
            } else {
                return 'Incorrect password. Something’s missing... Try again!';
            }
        }

        // Handle riddle steps
        if (riddleStep > 0) {
            return handleRiddleSteps(cmd);
        }

        // Handle different commands
        switch (cmd) {
            case 'whois':
                return 'Hey hey! my name is Thomas, im 16 years old and i want to be a Programmer';
            case 'about':
                return 'This website is like a terminal, with it own commands. Pretty cool, right?';
            case 'help':
                return 'Types of commands:\n<div class="help-text-container"><pre class="help-text">whois\nhelp\nabout\ncontact\nclear\necho\nproblem\nsecret\npokemongo\nfortune\nvalorant code\nunlock</pre></div>';
            case 'contact':
                return 'You can reach me via email at "Thomasneverdalhanssen@gmail.com".';
            case 'problem':
                return 'If you cannot see the input field, that’s fine. But if you dig deeper, you may uncover a undiscovered mystery...';
            case 'clear':
                clearTerminal();
                return ''; // Return empty string after clearing terminal
            case 'secret':
                // Give a fake error with a hidden clue
                return `Error 666: Access Denied. HINT: Maybe try exploring deeper with "unlock"?...if you dare to do so....`;
            case 'pokemon go':
                return 'My pokemon go code is: 8686 1006 6592';
            case 'fortune':
                return 'du er rar, på en god måte :>';
            case 'valorant code':
                return 'Gonzolt225#mommy er min valorant ID';
            case 'unlock':
                // Trigger the start of the riddle
                riddleStep = 1;
                return 'The path to the secret lies in riddles. Here\'s your first one:\n"Who is the founder of this website...?" (Type your answer)';
            default:
                if (cmd.startsWith('thomas')) {
                    return cmd.substring(5); // Echo back the text after 'echo '
                }
                return `Command not found: ${command}`;
        }
    }

    function handleRiddleSteps(cmd) {
        switch (riddleStep) {
            case 1:
                if (cmd === 'thomas') {
                    riddleStep = 2;
                    return 'Correct! Next riddle:\n"How old am i?" (Type your answer)';
                } else {
                    return 'Wrong answer! Try again: "how old am i? hint: ive already told you."';
                }
            case 2:
                if (cmd === 'sixteen') {
                    riddleStep = 3;
                    return 'Correct! Final challenge: Type the command "secret" to continue.';
                } else {
                    return 'Wrong answer! Try again: "sigh....just type secret, its not hard to fail..."';
                }
            case 3:
                if (cmd === 'secret') {
                    awaitingPassword = true; // Now await password
                    riddleStep = 0; // Reset riddle steps
                    return 'Almost there! In what race did we humans grow from?:';
                }
                break;
            default:
                return 'You are lost... Maybe try "help"?';
        }
    }

    function clearTerminal() {
        output.innerHTML = ''; // Clear the output content
        // Scroll to the top after clearing
        terminalBody.scrollTop = 0;
    }

    // Ensure userInput remains focused when clicking away
    document.addEventListener('click', function(event) {
        if (!userInput.contains(event.target)) {
            focusUserInput();
        }
    });

    function animateTypeOut(element, text) {
        element.innerHTML = ''; // Clear existing text
        let i = 0;

        function type() {
            if (i < text.length) {
                let currentChar = text.charAt(i);
                if (currentChar === '<') {
                    const endTagIndex = text.indexOf('>', i);
                    if (endTagIndex !== -1) {
                        element.innerHTML += text.substring(i, endTagIndex + 1);
                        i = endTagIndex + 1;
                    }
                } else {
                    element.innerHTML += currentChar;
                    i++;
                }
                setTimeout(type, 25); // Adjust typing speed here
            }
        }

        type();
    }
});