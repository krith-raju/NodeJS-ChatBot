import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
    console.log(colors.bold.green('Welcome to the Chatbot Program!')); //chatbot lines
    console.log(colors.bold.green('You can start chatting with the bot.'));  //chatbot lines

    const chatHistory = []; // store conversation history

    while(true) {
        const userInput = readlineSync.question(colors.yellow('You: '));

        try {
            //constructs the messages by iterating over the history
            const messages = chatHistory.map(([role, content]) => ({ role, content }));

            //adding latest user input
            messages.push({ role: 'user', content: userInput });

            //Call API with user input
            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: messages
            });
            //completion text/content
            const completionText = completion.choices[0].message.content; //gives direct text we want

            if (userInput.toLowerCase() === 'exit') { //keyword exit used to exit program
                //chatBot response design
                console.log(colors.green('Bot: ') + completionText);
                return;
            }

            console.log(colors.green('Bot: ') + completionText);

            //Update history with the user input and the assistant response. The history is updated with this
            chatHistory.push(['user', userInput]);
            chatHistory.push(['assistant', completionText]);
        } catch (error) {
            if (error.response) {
                console.error(colors.red(error.response.data.error.code));
                console.error(colors.red(error.response.data.error.message));
                return;
            }
            console.error(colors.red(error));
            return;
        }
    }
}

main();
