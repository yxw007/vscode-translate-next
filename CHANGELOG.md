# Changelog


## v0.3.0



### 🚀 Enhancements

- Add terminal translation selected bar and Right click to select text replace translation 

### 🩹 Fixes

- Update shortcut descriptions for clarity and consistency across multiple languages 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.2.15



### 🩹 Fixes

- Prevent duplicate translations by adding a pending cache 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.2.14



### 🩹 Fixes

- Solve the problem of shortcuts not found and normalize shortcut naming descriptions 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.2.13



### 🩹 Fixes

- Too many requests, avoid non-stop pop-ups 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.2.12



### 💅 Refactors

- Plugin and terminal log are displayed separately to avoid reading terminal translation log 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.2.11



### 🩹 Fixes

- **deepl:** Bad Request Parameter 'text' not specified 

### 💅 Refactors

- Re implement the code prompt mplementation method 

### 🏡 Chore

- Adjust the logView resource directory structure 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.2.10



### 🩹 Fixes

- Failure of the request cause : translate fail ! Unexpected token 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.2.9



### 📖 Documentation

- Updated Terminal Translation Demo 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.2.8



### 🚀 Enhancements

- Add a log output panel 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.2.7



### 📖 Documentation

- Add Japanese and Korean documents 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.2.6



### 🔥 Performance

- Temporarily close annoying 54003 error prompt 

### 📖 Documentation

- Add video tutorials link to readme 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.2.5



### 🚀 Enhancements

- Add log panel 
- Add log panel" 

### 🩹 Fixes

- Avoid error reporting 

### 🏡 Chore

- Collect plugin use information 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.2.4



### 🔥 Performance

- Optimize error prompt 

### 🩹 Fixes

- Unable to output logs 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.2.3



### 🚀 Enhancements

- Add concurrency and request gap delay options for translation requests 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.2.2



### 🩹 Fixes

- Pick changelog content mistake 
- Invalid Access Limit 

### 🏡 Chore

- **ci:** Enable replacing contents in CI workflow 
- **ci:** Add tag and push to origin if release doesn't exist 
- **ci:** Add concurrency group and prepare tag for deployment 
- **ci:** Update CI workflow to enable creating and pushing tags if they don't exist 

### 🤖 CI

- Refactor CI workflow to extract latest tag and use it for release creation 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.2.1



### 📖 Documentation

- Add openai relative document 

### 🏡 Chore

- **ci:** Enable keeping files in publish step 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.2.0



### 🚀 Enhancements

- Integrate openai 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.1.10



### 🔥 Performance

- Special characters skip translation directly 
- Auto refresh the engine configuration after change the configuration to avoid restart 

### 🩹 Fixes

- Hover prompt translate not newline 
- **ci:** Relevant contents of. github are not deployed 
- IsEmptyComment judgment mistake 

### 💅 Refactors

- GetMarkdownTextValue logic 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.1.9



### 🩹 Fixes

- PromptHover translating only one line in multiple lines  close #7 ([#7](https://github.com/yxw007/vscode-translate-next/issues/7))
- Avoid translating empty comments 

### 📖 Documentation

- Update readme 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.1.8



### 🚀 Enhancements

- Integrate amplitude analytics 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.1.7



### 🏡 Chore

- Update docs 
- Ignore unnecessary files 
- Update deps 
- Update release workflow and add content replacement script 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.1.6



### 📖 Documentation

- Improve document 

### 🤖 CI

- Add docs deploy to release workflows 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.1.5



### 🚀 Enhancements

- Finer grained control over the hover enable type 

### 🔥 Performance

- Avoid creating an empty hover 

### 🩹 Fixes

- Texts parameter must be a non-empty string or array of non-empty strings 

### 📖 Documentation

- Fix broken link in README.md 
- Improve README 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.1.4



### 📖 Documentation

- Add FAQ Frequently Asked Questions 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.1.3



### 🚀 Enhancements

- Beautify error log output 

### 🔥 Performance

- Encode html entities to avoid impression reading experience 

### 🩹 Fixes

- Remove the pop-up frame not used for translating terminal text 

### 💅 Refactors

- Unified processing of translations into a single function for later maintenance 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.1.2



### 🚀 Enhancements

- Add terminal translate text 
- Optimize the automatic matching rules of mother language 

### 📖 Documentation

- Instructions for adding shortcuts 
- Update README with additional translation usage examples 

### ❤️ Contributors

- FreeCoderX ([@yxw007](http://github.com/yxw007))

## v0.1.1



### 🩹 Fixes

- The plugin cannot be used because ctx is called before initialization is complete 

### ❤️ Contributors

- FreeCoderX ([@yxw007](http://github.com/yxw007))

## v0.1.0



### 🚀 Enhancements

- Optimize error alerts and popups by clicking on them 

### 💅 Refactors

- ⚠️  Standardize the naming of configurations and change them to camelback uniformly 

### 📖 Documentation

- Add support for Deepl translation engine in README and package.json 
- Add shortcut for viewing plugin output logs in README files 

### 🏡 Chore

- Update deps 

#### ⚠️ Breaking Changes

- ⚠️  Standardize the naming of configurations and change them to camelback uniformly 

### ❤️ Contributors

- FreeCoderX ([@yxw007](http://github.com/yxw007))

## v0.0.15



### 📖 Documentation

- Add FAQ to readme 

### 🏡 Chore

- Update deps 

### ❤️ Contributors

- FreeCoderX ([@yxw007](http://github.com/yxw007))

## v0.0.14



### 🚀 Enhancements

- StatusBar add icon 
- Translate code hover and showQuickPick add placeHolder 

### 💅 Refactors

- Simplified configuration use 

### ❤️ Contributors

- FreeCoderX ([@yxw007](http://github.com/yxw007))

## v0.0.13



### 🩹 Fixes

- Hover markdown don't translate 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.0.12



### 🚀 Enhancements

- Ability to set translation cache time 

### 🏡 Chore

- Use more accurate name 

### ❤️ Contributors

- FreeCoderX <aa4790139@gmail.com>

## v0.0.11



### 🚀 Enhancements

- Hover translate 

### 💅 Refactors

- Split function 
- Config's relative code 

### 📖 Documentation

- Improve document 

### ❤️ Contributors

- FreeCoderX ([@yxw007](http://github.com/yxw007))

## v0.0.10



### 🩹 Fixes

- Engine google not found. Resolved #3 ([#3](https://github.com/yxw007/vscode-translate-next/issues/3))

### ❤️ Contributors

- FreeCoderX ([@yxw007](http://github.com/yxw007))

## v0.0.9



### 🩹 Fixes

- The target language was initiated incorrectly for the first time 

### 🏡 Chore

- Update readme 
- Update readme 

### ❤️ Contributors

- FreeCoderX ([@yxw007](http://github.com/yxw007))

## v0.0.8



### 🩹 Fixes

- Can't use esm import problem and no type prompt problem 

### ❤️ Contributors

- FreeCoderX ([@yxw007](http://github.com/yxw007))

## v0.0.7



### 🩹 Fixes

- Don't update target language after changing the engine in the setting 

### ❤️ Contributors

- FreeCoderX ([@yxw007](http://github.com/yxw007))

## v0.0.6



### 🩹 Fixes

- Clear recentlyUsed after change default engine，avoid of invalid language issues 
- Can't set deepl as default engine in setting config view 

### 📖 Documentation

- Add download link to README 

### 🏡 Chore

- Add github sponsor config 
- Add issue templates 
- Update doc image 

### ❤️ Contributors

- FreeCoderX ([@yxw007](http://github.com/yxw007))

## v0.0.5



### 🩹 Fixes

- Avoid manual define type 

### ❤️ Contributors

- FreeCoderX ([@yxw007](http://github.com/yxw007))

## v0.0.4



### 🩹 Fixes

- Use a bad solution to solve the problem that the extension cannot be used 

### ❤️ Contributors

- FreeCoderX ([@yxw007](http://github.com/yxw007))

## v0.0.3



## v0.0.3-alpha.0



### 🩹 Fixes

- **ci:** Remove unnecessary pnpm setup step in release workflow 

### ❤️ Contributors

- FreeCoderX ([@yxw007](http://github.com/yxw007))

## v0.0.2



### 🚀 Enhancements

- Support deepl translate engine 
- Automatically update target language list when changing default engine 

### 🔥 Performance

- Improve the extension experience 

### 🩹 Fixes

- Ts type prompt error 

### 📖 Documentation

- Add license badge to README_zh-CN.md 

### 🤖 CI

- Remove unnecessary git configuration and commit steps 
- Prevent release workflow from running on forks 

### ❤️ Contributors

- FreeCoderX ([@yxw007](http://github.com/yxw007))

## v0.0.1


### 🚀 Enhancements

- Integrate husky,lint-staged etc 
- Integrate translate api 
- Integrate translate api 
- Pass the most basic flow 
- Add translate,change language,change engine 
- Add status bar item, easy to switch between target language and translation engine 
- Add release workflow 

### 🩹 Fixes

- Region config mistake and init properties mistake 

### 📖 Documentation

- Improve readme 

### 📦 Build

- Change to npm package, pnpm can't vsce package 

### ❤️ Contributors

- FreeCoderX ([@yxw007](http://github.com/yxw007))

