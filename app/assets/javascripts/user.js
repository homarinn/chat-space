$(function(){
  let search_result = $("#user-search-result")
  let group_users = $("#chat-group-users")

  let appendSearchUser = (user) => {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_result.append(html);
  };

  let appendNoUser = (message) => {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${message}</p>
                </div>`
    search_result.append(html);
  };

  let appendGroupMember = (member) => {
    let html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${member.userId}'>
                  <input name='group[user_ids][]' type='hidden' value='${member.userId}'>
                  <p class='chat-group-user__name'>${member.userName}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    group_users.append(html);
  };

  $("#user-search-field").on("keyup", function(){
    let input = $(this).val()

    $.ajax({
      url: '/users',
      type: "GET",
      dataType: 'json',
      data: { keyword: input }
    })
    .done(function(users){
      search_result.empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendSearchUser(user);
        });
      } else {
        appendNoUser('一致するユーザーが見つかりません');
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });
  });

  search_result.on("click", ".user-search-add", function(e){
    let target = $(e.target);
    let member = target.data();
    target.parent().remove();
    appendGroupMember(member);
  });

  group_users.on("click", ".user-search-remove", function(e){
    $(e.target).parent().remove();
  });
});