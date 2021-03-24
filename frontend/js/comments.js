function addComment(user, text) {
    let html = $(`<div class="comment">
                        <div class="user-info">
                            <div><img src="${user.avatar}"></div>
                            <div class="username">${user.username}</div>
                        </div>
                        <div class="text">${text}</div>
                    </div>`);
    
    $("#comments .comments-list").append(html);
}

jQuery(document).ready(function($){
    
    $.ajax({
        type: 'GET',
        url: '/frontend/index.php?model=comment&action=index&product_id=${parseInt$("input[name=product_id]").val())}',
        dataType: 'json',
        success: function (comments) {
            for (let index in comments) {
                let comment = comments[index];

                let user = {
                    username: comment.username,
                    avatar: comment.avatar
                }

                addComment(user, comment.comment);
            }
        },
        error: function (data) {
            console.error(data)
        }
    });
   
    $("#comment-form").submit(function (event) {
        event.stopPropagation();
        
        let user = {
            username: $(this).find('input[name=username]').val(),
            email: $(this).find('input[name=email]').val(),
            avatar: '/frontend/img/avatar.jpg'
        };
        let productId = $(this).find('input[name=product_id]').val();
        let text = $(this).find('textarea[name=message]').val();
        
        let comment = {
            product_id: productId,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            text: text
        };

        $.ajax({
            type: 'POST',
            url: '/frontend/index.php?model=comment&action=create',
            data: comment,
            dataType: 'json',
            success: function (response) {
                if (response && response.result === 'OK') {
                    
                }
            },
            error: function (data) {
                console.error(data)
            }
        });

        addComment(user, text)

        $(this).find('input[name=username]').val('');
        $(this).find('input[name=email]').val('');
        $(this).find('textarea[name=message]').val('');

        return false;

    });
    
});