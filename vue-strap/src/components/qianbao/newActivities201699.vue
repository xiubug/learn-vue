<template>
    <div class="bs-example">
        <a target="_blank" href="http://h5.izhenglan.com/_test/activity/qianbao/newActivities.html" class="btn btn-danger btn-lg">新窗口打开(测试库)</a>
        <a target="_blank" href="http://h5.izhenglan.com/activity/qianbao/newActivities.html" class="btn btn-success btn-lg">新窗口打开(正式库)</a>
        <!--v-component-->
    </div>
    <div slot="markup">
        <div role="alert" message="<strong>Note</strong> This is an html message" class="fade-transition alert alert-danger">
            注意：1.立即提现要拦截登陆  2.必填参数appVersion
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
                    <td>测试:&nbsp;&nbsp;&nbsp;<a target="_blank" href="http://h5.izhenglan.com/_test/activity/qianbao/newActivities.html">http://h5.izhenglan.com/_test/activity/qianbao/newActivities.html</a>
                        <br>正式:&nbsp;&nbsp;&nbsp;<a target="_blank" href="http://h5.izhenglan.com/activity/qianbao/newActivities.html">http://h5.izhenglan.com/activity/qianbao/newActivities.html</a></td>
                </tr>
                <tr>
                    <td>与app交互</td>
                    <td>立即提现</td>
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
    <h2>立即提现</h2>
    <div class="bs-example">
        <h3>代码/链接</h3>
        <!-- Output & Code sample -->
        <pre class=" language-markup" data-language="Markup"><code class=" language-markup"><span class="token tag"><span class="token tag"><span class="token punctuation"></span>
// app立即提现(iOS)
cash({'type': 'cash'})

// app立即提现(Android)
window._WebView_JS_Zhenglanwall.Zhenglanwall('{"type": "cash"}');

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
                            <td>cash</td>
                            <td>
                                <p>函数类型(cash：立即提现)</p>
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
