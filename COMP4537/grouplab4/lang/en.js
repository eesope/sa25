const OK = {
    show_new_word : "New entry recorded:",
    show_word: "The word found:",
    total_req : "Total request number so far: ",


}

const NOT_OK = {
    page_not_found: "404: Please check the url again.",
    word_not_found: "404: The requested word not exist on the dictionary. You can add one with POST request.",
    already_exist: "Warning! The requested word is already exist. The request cannot be processed."
}

module.exports = { OK, NOT_OK };
