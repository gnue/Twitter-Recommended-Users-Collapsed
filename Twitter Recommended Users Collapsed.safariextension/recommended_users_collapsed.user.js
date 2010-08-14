// ==UserScript==
// @name			Twitter Recommended Users Collapsed
// @namespace		http://so-kukan.com/
// @description		Twitterサイトのrecommended_users(Who to follow)を畳んだ状態にします
// @include			https://twitter.com/*
// @include			http://twitter.com/*
// ==/UserScript==
// UPDATE INFO http://trac.so-kukan.com/tools/wiki/TwitterRecommendedUsersCollapsed
//
// 動作環境
//   * Safari + GreaseKit
//   * Firefox + Greasemonkey
//   * Mac OS 10.6 でのみ確認
//
// 更新履歴
//   [2010-08-14] 1.0	最初のリリース


// クラスをトグルさせる
function toggle_class(e, className)
{
	var klass = e.getAttribute('class');
	var c = klass?klass.split(' '):[];
	var i = c.indexOf(className);

	if (i == -1)
		c.push(className);
	else
		c.splice(i, 1);

	e.setAttribute('class', c.join(' '));

	return (i == -1);
}


// recommended_users に class='collapsible collapsed' を追加する
var recommended_users = document.getElementById('recommended_users');

if (recommended_users)
{
	recommended_users.setAttribute('class', 'collapsible collapsed');
	recommended_users.addEventListener('click', function() { toggle_class(recommended_users, 'collapsed') }, false);
}
