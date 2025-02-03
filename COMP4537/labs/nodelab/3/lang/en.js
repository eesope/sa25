const greetingMSG = "Hello %1, What a beautiful day.";
const BAD_404 = "404: Unable to process the request; check the page link.";

const file_part = {
    no_access: `500: Server Error; Unable to access the requested file.`,
    ok: `Text was processed successfully.`
}

module.exports = { greetingMSG, BAD_404, file_part };
