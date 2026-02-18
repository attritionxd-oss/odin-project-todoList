import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: { app: "./src/index.js" },
  devServer: {
    static: "./dist",
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Project: Todo List",
      template: "./src/template.html",
    }),
    new FaviconsWebpackPlugin("./src/logo.png"),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name][contenthash].js",
    clean: true,
  },
};
