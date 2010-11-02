// ==UserScript==
// @name			Twitter Recommended Users Collapsed
// @namespace		http://so-kukan.com/
// @description		Twitterサイトのrecommended_users(Who to follow)を畳んだ状態にします
// @include			https://twitter.com/*
// @include			http://twitter.com/*
// ==/UserScript==
// UPDATE INFO http://github.com/gnue/Twitter-Recommended-Users-Collapsed
//
// 動作環境
//   * Safari + GreaseKit
//   * Firefox + Greasemonkey
//   * Mac OS 10.6 でのみ確認
//
// 更新履歴
//   [2010-11-03] 1.1.2	タグのclass属性が user-rec-inner に変更されたのでそれに対応
//   [2010-10-06] 1.1.1	新Web UIのコードをリファクタリング、リトライ回数を5→20に変更
//   [2010-10-03] 1.1	新Web UIに対応
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
// 旧Web UI
var recommended_users = document.getElementById('recommended_users');

if (recommended_users)
{
	recommended_users.setAttribute('class', 'collapsible collapsed');
	recommended_users.addEventListener('click', function() { toggle_class(recommended_users, 'collapsed') }, false);
}


// 新Web UI
//hidden_dashboard_component('wtf-inner', 1000, 20);		// 古いほう
hidden_dashboard_component('user-rec-inner', 1000, 20);		// 2010-11-03 時点


function dashboard_component(func, delay, try_count)
{
	function component()
	{
		if (! func())
		{	// 実行できなかった
			if (try_count--)
			{	// try_count だけ再チャレンジ
				setTimeout(component, delay);
			}
		}
	}

	component();
}


function hidden_dashboard_component(className, delay, try_count)
{
	function hidden_component()
	{
		var inner = document.getElementsByClassName(className);

		if (0 < inner.length)
		{
			var node = inner[0].parentNode;
			node.style.display = 'none';
			return true;
		}

		return false;
	}

	dashboard_component(hidden_component, delay, try_count);
}
