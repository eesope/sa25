const greetingMSG = "Hello %1, What a beautiful day.";
const BAD_404 = "404: Unable to process the request; check the page link.";
const getName = "Write your name after the URL such as: url/?name=thename";
const timeInfo = "Server current date and time is";

const RWfile = {
    no_access: `500: Server Error; Unable to access the requested file.`,
    ok: `Following text was processed successfully:`,
    no_text_param: `Error: text parameter not founded. url/?text=some_word`
}

module.exports = { greetingMSG, BAD_404, RWfile, getName, timeInfo };
