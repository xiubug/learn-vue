<template>
    <div class="bs-example">
        <a target="_blank" href="http://h5.izhenglan.com/_test/activity/qianbao/receiveCash201699.html" class="btn btn-danger btn-lg">新窗口打开(测试库)</a>
        <a target="_blank" href="http://h5.izhenglan.com/activity/qianbao/receiveCash201699.html" class="btn btn-success btn-lg">新窗口打开(正式库)</a>
        <!--v-component-->
    </div>
    <div slot="markup">
        <div role="alert" message="<strong>Note</strong> This is an html message" class="fade-transition alert alert-danger">
            注意：1.必填参数appVersion
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>应用</th>
                    <th>说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>url值</td>
                    <td>测试:&nbsp;&nbsp;&nbsp;<a target="_blank" href="http://h5.izhenglan.com/_test/activity/qianbao/receiveCash201699.html">http://h5.izhenglan.com/_test/activity/qianbao/receiveCash201699.html</a>
                        <br>正式:&nbsp;&nbsp;&nbsp;<a target="_blank" href="http://h5.izhenglan.com/activity/qianbao/receiveCash201699.html">http://h5.izhenglan.com/activity/qianbao/receiveCash201699.html</a></td>
                </tr>
                <tr>
                    <td>与app交互</td>
                    <td>url入参，立即邀请，立即登录</td>
                </tr>
                <tr>
                    <td>与后台交互</td>
                    <td>微信分享(签名，时间戳等获取)</td>
                </tr>
                <tr>
                    <td>应用</td>
                    <td>app头部banner轮播图</td>
                </tr>
                <tr>
                    <td>链接来源</td>
                    <td>后台接口读取</td>
                </tr>
            </tbody>
        </table>
        <!--v-if-->
    </div>
    <h2>url入参</h2>
    <div class="bs-example">
        <h3>代码/链接</h3>
        <pre class=" language-markup" data-language="Markup"><code class=" language-markup"><span class="token tag"><span class="token tag">url后面的参数</span></code></pre>
        <h3>相关说明</h3>
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>参数名称</th>
                        <th>参数取值</th>
                        <th>参数说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>appVersion</td>
                        <td>版本号</td>
                        <td>
                            <p>区别是否上线</p>
                        </td>
                    </tr>
                    <tr>
                        <td>mobile</td>
                        <td>手机号</td>
                        <td>
                            <p>当前登录手机号，作为邀请手机号使用</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!--v-if-->
        </div>
    </div>
    <h2>分享好友</h2>
    <div class="bs-example">
        <h3>代码/链接</h3>
        <!-- Output & Code sample -->
        <pre class=" language-markup" data-language="Markup"><code class=" language-markup"><span class="token tag"><span class="token tag"><span class="token punctuation"></span>
// app分享(iOS)
goShare({'title': '正蓝钱包让你免息提现3000元', 'summary': '您的好友邀请您领取正蓝钱包3000元白条和55元还款券', 'imgUrl': 'http://h5.izhenglan.com/activity/images/share/share-201699.png', 'html': 'http://h5.izhenglan.com/activity/qianbao/qbRegDownload1.html?mobile=18458215315&timestamp=1473489481924'})

// app分享(Android)
window._WebView_JS_Zhenglanwall.Zhenglanwall('{"type": "goShare","title": "' + obj.title + '", "summary": "' + obj.summary + '", "imgUrl": "' + obj.imgUrl + '", "html": "' + obj.html + '"}');
</span></span>
</code></pre>
        <!-- Options -->
        <div class="options">
            <h3>相关说明</h3>
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>参数名称</th>
                            <th>参数取值</th>
                            <th>参数说明</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>type</td>
                            <td>goShare</td>
                            <td>
                                <p>函数类型(goShare：分享)</p>
                            </td>
                        </tr>
                        <tr>
                            <td>title</td>
                            <td>正蓝钱包让你免息提现3000元</td>
                            <td>
                                <p>分享标题</p>
                            </td>
                        </tr>
                        <tr>
                            <td>summary</td>
                            <td>您的好友邀请您领取正蓝钱包3000元白条和55元还款券</td>
                            <td>
                                <p>分享描述</p>
                            </td>
                        </tr>
                        <tr>
                            <td>imgUrl</td>
                            <td>http://h5.izhenglan.com/activity/images/share/share-201699.png</td>
                            <td>
                                <p>分享图标</p>
                            </td>
                        </tr>
                        <tr>
                            <td>html</td>
                            <td>http://h5.izhenglan.com/activity/qianbao/qbRegDownload1.html?mobile=18458215315&timestamp=1473489481924</td>
                            <td>
                                <p>分享链接</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!--v-if-->
            </div>
        </div>
    </div>
    <h2>立即登录</h2>
    <div class="bs-example">
        <h3>代码/链接</h3>
        <!-- Output & Code sample -->
        <pre class=" language-markup" data-language="Markup"><code class=" language-markup"><span class="token tag"><span class="token tag"><span class="token punctuation"></span>
// app立即登录(iOS) 有返回值，返回值手机号
goLogin('') 

// app立即提现(Android) 有返回值，返回值手机号
window._WebView_JS_Zhenglanwall.Zhenglanwall('{"type": "goLogin"}');

</span></span>
</code></pre>
        <!-- Options -->
        <div class="options">
            <h3>相关说明</h3>
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>参数名称</th>
                            <th>参数取值</th>
                            <th>参数说明</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>type</td>
                            <td>goLogin(Android设备)</td>
                            <td>
                                <p>函数类型(goLogin：立即登录)</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!--v-if-->
            </div>
        </div>
    </div>
    <!-- Accessibility -->
    <div class="m-b-md"></div>
</template>
