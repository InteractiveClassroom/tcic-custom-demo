import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

// 开发模式编译完成提示插件
class DevDoneHintPlugin {
	apply(compiler) {
		compiler.hooks.done.tap("DevDoneHintPlugin", () => {
			// 仅在开发模式下输出
			if (compiler.options.mode !== "production") {
				const port = (compiler.options.devServer && compiler.options.devServer.port) || 3000;
				console.log("\n拼接参数: &debugjs=http://localhost:" + port + "/custom.js\n");
			}
		});
	}
}

export default defineConfig({
	entry: {
		main: "./src/index.js"
	},
	output: {
		filename: "custom.js"
	},
	devServer: {
		port: 3000,
		allowedHosts: 'all',
		client: {
      overlay: false,
    },
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: "asset"
			},
			{
				test: /\.js$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								parser: {
									syntax: "ecmascript"
								}
							},
							env: { targets }
						}
					}
				]
			}
		]
	},
	optimization: {
		minimizer: [
			new rspack.SwcJsMinimizerRspackPlugin(),
			new rspack.LightningCssMinimizerRspackPlugin({
				minimizerOptions: { targets }
			})
		]
	},
	experiments: {
		css: true
	},
	plugins: [
		new DevDoneHintPlugin()
	]
});
