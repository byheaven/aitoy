const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: './src/client/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js',
      publicPath: '/',
      clean: true
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src/client'),
        '@shared': path.resolve(__dirname, 'src/shared'),
        '@convex': path.resolve(__dirname, 'convex')
      }
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'ts-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name].[hash][ext]'
          }
        },
        {
          test: /\.(glb|gltf|obj|fbx)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'models/[name].[hash][ext]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[hash][ext]'
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode),
        'process.env.CONVEX_URL': JSON.stringify(process.env.CONVEX_URL || ''),
        'process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY': JSON.stringify(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '')
      }),
      // Copy GitHub Pages files for custom domain and proper deployment
      ...(isProduction ? [{
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap('CopyGitHubPagesFiles', () => {
            // Copy CNAME file for custom domain
            const cnamePath = path.resolve(__dirname, 'public/CNAME');
            const cnameDestPath = path.resolve(__dirname, 'dist/CNAME');
            if (fs.existsSync(cnamePath)) {
              fs.copyFileSync(cnamePath, cnameDestPath);
            }
            
            // Copy .nojekyll file to prevent Jekyll processing
            const nojekyllPath = path.resolve(__dirname, 'public/.nojekyll');
            const nojekyllDestPath = path.resolve(__dirname, 'dist/.nojekyll');
            if (fs.existsSync(nojekyllPath)) {
              fs.copyFileSync(nojekyllPath, nojekyllDestPath);
            }
          });
        }
      }] : [])
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'public')
      },
      compress: true,
      port: 3000,
      hot: true,
      historyApiFallback: true,
      open: true
    },
    optimization: isProduction ? {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10
          },
          three: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: 'three',
            priority: 20
          }
        }
      }
    } : {}
  };
};