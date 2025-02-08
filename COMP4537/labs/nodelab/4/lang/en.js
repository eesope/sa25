const OK = {
    show_new_word : "New entry recorded:\n",
    total_req : "Total request number so far: ",


}

const NOT_OK = {
    not_found_404: "404: The requested word not exist on the dictionary. You can add one with GET request.";
    already_exist: "Warning! The requested word is already exist. The request cannot be processed."
}

module.exports = { OK, NOT_OK };
