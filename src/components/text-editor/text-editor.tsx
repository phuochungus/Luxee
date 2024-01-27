import { Editor } from "@tinymce/tinymce-react";

export function TextEditor() {
    return (
        <Editor
            apiKey="l8kc9p8z98af4d8pknzj21xy19a09u53gvinojn4yca3qty9"
            init={{
                min_height: 200,
                plugins:
                    "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",

                toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                placeholder: "Descripe it here...",
            }}
        />
    );
}
