const greetingMSG = "Hello %1, What a beautiful day.";
const BAD_404 = "404: Could not process the request.";

const file_part = {
    no_access: `500: Server Error; could not access the requested file.`,
    ok: `Text was processed successfully.`
}

module.exports = { greetingMSG, BAD_404, file_part };
