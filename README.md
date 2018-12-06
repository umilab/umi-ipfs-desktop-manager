<h1 align="center">
  IPFS Desktop
</h1>

![ipfs-desktop-screenshot](https://user-images.githubusercontent.com/58871/34874493-0d306e5a-f791-11e7-94cb-5ac5a0d225b9.png)

<p align="center">
  <a href="http://protocol.ai"><img src="https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square" /></a>
  <a href="http://ipfs.io/"><img src="https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square" /></a>
  <a href="http://webchat.freenode.net/?channels=%23ipfs"><img src="https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square" /></a>
</p>

<p align="center">
  <a href="https://travis-ci.org/ipfs-shipyard/ipfs-desktop"><img src="https://img.shields.io/travis/ipfs-shipyard/ipfs-desktop.svg?style=flat-square" /></a>
  <a href="https://david-dm.org/ipfs-shipyard/ipfs-desktop"><img src="https://david-dm.org/ipfs-shipyard/ipfs-desktop.svg?style=flat-square" /></a>
  <a href="https://codecov.io/gh/ipfs-shipyard/ipfs-desktop"><img src="https://img.shields.io/codecov/c/github/ipfs-shipyard/ipfs-desktop.svg?style=flat-square"></a>
  <a href="https://github.com/feross/standard"><img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square"></a>
  <a href="https://github.com/RichardLitt/standard-readme"><img src="https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square" /></a>
</p>

<h3 align="center">
A menubar <a href="https://ipfs.io">IPFS</a> application to get you on the Distributed Web!
</h3>

IPFS Desktop allows you to run your IPFS node on your machine without having to bother with command line tools. You can manage your node, add your files, easily change the settings... [everything](#features) from just one interface.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Features](#features)
- [Developer Guide](#developer-guide)
- [Contribute](#contribute)

## Install

Go to the **[latest release](https://github.com/ipfs-shipyard/ipfs-desktop/releases/latest)** page and download IPFS Desktop for your OS.


- Note for **Debian** and **Ubuntu** users: starting with apt 1.1 (Ubuntu 16.04, Debian Stretch) `apt install` allows local files:
  ```
  sudo apt install ./ipfs-desktop*.deb
  ```

### Install from Source

If you're interested in developing IPFS Desktop, you can also install it from source...

You will need [Node.js](https://nodejs.org/en/) `>=6.0.0` and
need [npm](npmjs.org) `>=3.0` installed.

On macOS you may also need Xcode command line tools, if you haven't already, do so by:

```bash
xcode-select --install
sudo xcode-select --switch /Library/Developer/CommandLineTools
```

Then the follow the steps below to clone the source code, install the dependancies and run it the app:

```bash
git clone https://github.com/ipfs-shipyard/ipfs-desktop.git
cd ipfs-desktop
npm install
npm start
```

The IPFS Desktop app will launch and should appear in your OS menu bar.

## Usage

Click on the IPFS icon in the menubar to open the app.

| See IPFS Node Info | Share Files |
|:---:|:---:|
| ![](https://ipfs.io/ipfs/QmPBMMG4HUB1U1kLfwWvr6zQhGMcuvWYtGEFeTqBjG2jxW) | ![](https://ipfs.io/ipfs/QmSL8L5kMevXWDZguBwiwDVsQX6qkRFt1yTCDdnA1LmyR9) |

| Pin Hashes | See connected Peers |
|:---:|:---:|
| ![](https://ipfs.io/ipfs/QmTUS8rRufkXQp7ePRogMFLMxmf6YziYcb8HnDrVCvC2DF)| ![](https://ipfs.io/ipfs/QmW1SWU1aALf8sqSvEFGUtzK8oqX9BGNA6r4bzS8MPg94B) |

## Features

| Stats and Information | Files                   | Other                           |
|-----------------------|-------------------------|---------------------------------|
| Peer ID               | Add by drag'n'drop      | Easy access to the WebUI        |
| Location              | Add entire directories  | Easy access to Node Settings    |
| Addresses             | Delete files            | Pin hashes with labels          |
| Public Key            | Copy and share links    | Optional launch on startup      |
| Repository Size       |                         | Auto add screenshots            |
| Bandwidth Usage       |                         | Download copied hash            |
| Down/Up Speeds        |                         |
| Peers                 |                         |

## Developer Guide

### File Structure

All of the important files of this application are into `src` folder, which can be seen as the following tree:

```
├───controls
├───fonts             Static font files.
├───img               Static image assets.
├───js
│   ├───components
│   │   ├───logic     Reusable and stateful components. They have 'state' to track.
│   │   └───view      Reusable and stateless components. They are written as stateless functional components.
│   |───panes         A pane is a larger component to be used within screens.
|   └───screens       A screen is the everything visible at a given point in time inside a single window.
├───styles            Stylesheets in LESS format.
├───utils             Utilitarian classes and functions.
|───views             HTML view files.
└───index.js          Main entry point of the application.
```

### How to add an new pane

Start by creating a new file inside `./src/js/panes` with the following bootstrap content. For more information about each piece, take a look at the [`Header`](./src/js/components/view/header.js) and [`Footer`](./src/js/components/view/footer.js) components.

```js
import React from 'react'

import Pane from '../components/view/pane'
import Header from '../components/view/header'
import Footer from '../components/view/footer'

export default function MyPane {
    return (
      <Pane>
        <Header title='The title of your pane' />

        <div className='main'>
          <p>The body of your pane</p>
        </div>

        <Footer>
          <p>The footer of your pane</p>
        </Footer>
      </Pane>
    )
  }
}
```

Then, you'll have to import the file and create an entry on `panes` array on [`./src/js/screens/menu.js`](./src/js/components/view/icon.js) with a content similar to this one:

```
{
  id: 'my-pane-id',       // A simple slug to identify your pane.
  title: 'Title',         // To be shown in the menu.
  icon: 'ipfs'            // A themify icon ID (themify.me/themify-icons)
}
```

Now, you already have your pane created and its menu entry. Although, it you click on it, you'll probably get an error message since you aren't really routing that path to it. On the same file, go to `_getRouteScreen` function, and add a `case` for your pane on the `switch`. The value must be the same as the `id` you put on the menu entry.

### Components

The components are classes exported with CamelCase names. The corresponding files have the associated class name with hyphen-separated-words. So, e.g., `simple-stat.js` exports a class named `SimpleStat`.

#### [Stateless Components](./src/js/components/view)

+ [**Button**](./src/js/components/view/button.js) is a simple button with text.
+ [**CheckboxBlock**](./src/js/components/view/checkbox-block.js) is like an `InfoBlock`, but with a checkbox attached to it.
+ [**FileBlock**](./src/js/components/view/file-block.js) is used within a file list to describe a file with a button to copy its link.
+ [**Footer**](./src/js/components/view/footer.js) is the footer of a pane.
+ [**Header**](./src/js/components/view/header.js) is the header of a pane.
+ [**Heartbeat**](./src/js/components/view/heartbeat.js) displays an heartbeat-like animation with the IPFS logo.
+ [**IconButton**](./src/js/components/view/icon-button.js) is a button with an icon inside.
+ [**IconDropdownList**](./src/js/components/view/icon-dropdown-list.js) is a dropdown list with an icon.
+ [**Icon**](./src/js/components/view/icon.js) shows an icon.
+ [**InfoBlock**](./src/js/components/view/info-block.js) shows a block of information (used on node info pane).
+ [**KeyCombo**](./src/js/components/view/key-combo.js) is a key combination.
+ [**Key**](./src/js/components/view/key.js) is a key.
+ [**MenuOption**](./src/js/components/view/menu-option.js) is a menu option to show within a menu bar.
+ [**PinnedHash**](./src/js/components/view/pinned-hash.js) is a pinned hash.

#### [Statefull Components](./src/js/components/logic)

+ [**NewPinnedHash**](./src/js/components/view/new-pinned-hash.js) is a new pinned hash form.

## Contribute

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/contributing.md)

Feel free to join in. All welcome. Open an [issue](https://github.com/ipfs-shipyard/ipfs-desktop/issues)!

This repository falls under the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

## License

[MIT 2016 Protocol Labs, Inc.](./LICENSE)
