console.log(selected_text);

var popup = document.createElement('div');
popup.classList = ["french_word_popup"];

var popup_title = document.createElement("h2");
popup_title.innerHTML = selected_text;
popup.appendChild(popup_title);

document.body.appendChild(popup);


// function submitGoogleForm ($id, $post){
//     $formUrl = 'https://docs.google.com/a/vcu.edu/forms/d/e/1FAIpQLScK2wgma6Oicv_ZY9i-6tg_w9RfEKKkgiAFJDw15jJnmr5ofQ/formResponse?usp=pp_url&entry.1431785794=';
//     $projectName =$post->post_name;
//     $submit = '&submit=Submit';
//     $fullUrl = $formUrl.$projectName.$submit;
 
//     file_get_contents($fullUrl);
// }

// add_action( 'publish_project', 'submitGoogleForm', 10, 2);