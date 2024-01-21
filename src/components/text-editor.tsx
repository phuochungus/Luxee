import { Editor } from "@tinymce/tinymce-react";

export function TextEditor() {
    return (
        <Editor
            apiKey="l8kc9p8z98af4d8pknzj21xy19a09u53gvinojn4yca3qty9"
            init={{
                plugins:
                    "list advlist autolink autoresize autosave charmap emoticons fullscreen help image link lists media nonbreaking pagebreak preview quickbars save searchreplace table visualblocks visualchars wordcount",
                toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                tinycomments_mode: "embedded",
                tinycomments_author: "Author name",
                mergetags_list: [
                    { value: "First.Name", title: "First Name" },
                    { value: "Email", title: "Email" },
                ],
            }}
            initialValue="Welcome to TinyMCE!"
        />
    );
}
