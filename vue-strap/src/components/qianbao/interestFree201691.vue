<template>
    <div class="bs-example">
        <a target="_blank" href="http://h5.izhenglan.com/_test/activity/qianbao/interestFree201691.html?openWay=app" class="btn btn-danger btn-lg">新窗口打开(测试库)</a>
        <a target="_blank" href="http://h5.izhenglan.com/activity/qianbao/interestFree201691.html?openWay=app" class="btn btn-success btn-lg">新窗口打开(正式库)</a>
        <!--v-component-->
    </div>
    <div slot="markup">
        <div role="alert" message="<strong>Note</strong> This is an html message" class="alert alert-success alert-dismissible fade in">
            这是一个备注信息。
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
                    <td>测试:&nbsp;&nbsp;&nbsp;<a target="_blank" href="http://h5.izhenglan.com/_test/activity/qianbao/interestFree201691.html?openWay=app">http://h5.izhenglan.com/_test/activity/qianbao/interestFree201691.html?openWay=app</a>
                        <br>正式:&nbsp;&nbsp;&nbsp;<a target="_blank" href="http://h5.izhenglan.com/activity/qianbao/interestFree201691.html?openWay=app">http://h5.izhenglan.com/activity/qianbao/interestFree201691.html?openWay=app</a></td>
                </tr>
                <tr>
                    <td>与app交互</td>
                    <td>url入参，分享好友，我要借款</td>
                </tr>
                <tr>
                    <td>与后台交互</td>
                    <td>微信分享(签名，时间戳等获取)</td>
                </tr>
                <tr>
                    <td>应用</td>
                    <td>app初次打开弹窗，app头部banner轮播图</td>
                </tr>
                <tr>
                    <td>链接来源</td>
                    <td>静态链接</td>
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
                        <td>openWay</td>
                        <td>app</td>
                        <td>
                            <p>app内打开所需参数</p>
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
goShare({'title': '暴走开学季 免息享不停', 'summary': '你开学，我免息！白条借款最高3000元，24小时极速到账！妈妈再也不用担心你的零花钱！', 'imgUrl': 'http://h5.izhenglan.com/activity/images/share/share-201691.png', 'html': 'http://h5.izhenglan.com/activity/qianbao/qbReg201691.html?tem=temp'})

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
                            <td>暴走开学季 免息享不停</td>
                            <td>
                                <p>分享标题</p>
                            </td>
                        </tr>
                        <tr>
                            <td>summary</td>
                            <td>你开学，我免息！白条借款最高3000元，24小时极速到账！妈妈再也不用担心你的零花钱！</td>
                            <td>
                                <p>分享描述</p>
                            </td>
                        </tr>
                        <tr>
                            <td>imgUrl</td>
                            <td>http://h5.izhenglan.com/activity/images/share/share-201691.png</td>
                            <td>
                                <p>分享图标</p>
                            </td>
                        </tr>
                        <tr>
                            <td>html</td>
                            <td>http://h5.izhenglan.com/activity/qianbao/qbReg201691.html?tem=temp</td>
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
    <h2>我要借款</h2>
    <div class="bs-example">
        <h3>代码/链接</h3>
        <!-- Output & Code sample -->
        <pre class=" language-markup" data-language="Markup"><code class=" language-markup"><span class="token tag"><span class="token tag"><span class="token punctuation"></span>
// app我要借款(iOS)
borrow({'type': 'borrow'})

// app我要借款(Android)
window._WebView_JS_Zhenglanwall.Zhenglanwall('{"type": "borrow"}');

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
                            <td>borrow</td>
                            <td>
                                <p>函数类型(borrow：我要借款)</p>
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
