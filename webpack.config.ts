import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const configuration: webpack.Configuration = {
  mode: 'development',
  entry: './client/index.tsx',
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js', 'jsx']
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      },
      {
        test: /\.(ts|tsx)?$/,
        exclude: [/node_modules/],
        use: ['ts-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html'
    })
  ]
}

export default configuration
