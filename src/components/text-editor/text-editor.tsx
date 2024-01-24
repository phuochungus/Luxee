import { Editor } from "@tinymce/tinymce-react";

export function TextEditor() {
    return (
        <Editor
            apiKey="l8kc9p8z98af4d8pknzj21xy19a09u53gvinojn4yca3qty9"
            init={{
                min_height: 200,
                plugins:
                    "list advlist autolink autoresize autosave charmap emoticons fullscreen help image link lists media nonbreaking pagebreak preview quickbars save searchreplace table visualblocks visualchars wordcount",
                toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            }}
        />
    );
}
