<h3 align="center">
	「ctftime2discord」
</h3>

<h6 align="center">
  <a href="#-features">Features</a>
  ·
  <a href="#-setting-up">Setting Up</a>
  ·
  <a href="#-documentation">Documentation</a>
  ·
  <a href="#-license">License</a>
</h6>

<p align="center">
	<a href="https://github.com/darkguy10/ctftime2discord/stargazers">
		<img alt="Stargazers" src="https://img.shields.io/github/stars/darkguy10/ctftime2discord?style=for-the-badge&logo=starship&color=C9CBFF&logoColor=D9E0EE&labelColor=302D41"></a>
	<a href="https://github.com/DarkGuy10/ctftime2discord/issues">
		<img src="https://img.shields.io/github/issues/DarkGuy10/ctftime2discord?colorA=1e1e28&colorB=bee4ed&logoColor=D9E0EE&logo=gitbook&style=for-the-badge"></a>
  <a href="https://github.com/darkguy10/ctftime2discord/releases/latest">
  	<img alt="Releases" src="https://img.shields.io/github/release/darkguy10/ctftime2discord?style=for-the-badge&logo=github&color=F2CDCD&logoColor=D9E0EE&labelColor=302D41"/></a>
</p>

&nbsp;

<p align="center">
  A simple, customizable github action that fetches CTFTime events and sends updates through a Discord webhook.
</p>

&nbsp;

### ✨ Features

- Customizable, almost entirely
- Easy setup (literally a single file)
- Schedule-able, using Github Action cron jobs
- Does not require a hosting service (unlike regular discord bots)

&nbsp;

### 🚀 Setting Up

Just create a GitHub repository and add your workflow file.

An example can be found in the [`.github/workflow/weekly.yml`](https://github.com/darkguy10/ctftime2discord/blob/main/.github/workflow/weekly) file in this repo.

> [!TIP]
> You can customize your action to run whenever you wish. I've used cron for scheduling in this example but you don't need to

```yaml
name: Weekly CTF Update

on:
  schedule:
    - cron: '0 12 * * 4'
  workflow_dispatch:

jobs:
  Weekly-Update:
    name: Weekly Update
    environment: libbabel.so
    runs-on: ubuntu-latest

    steps:
      - name: Check out git repository
        uses: actions/checkout@v4

      - name: ctftime2discord
        uses: DarkGuy10/ctftime2discord@v1.0.0
        with:
          webhook_url: ${{ secrets.WEBHOOK_URL }}
          window_size: 4
          message_content: <@&1381971729680961566>
          app_username: Watch Doggo
          app_avatar: https://i.imgur.com/cuEp3vr.gif
          embed_color: 11845374
          footer_text: Doggo fetched everything very fast
          footer_icon: https://i.imgur.com/cuEp3vr.gif
          filter_online: true
```

> [!WARNING]
> Make sure you do not commit the webhook url to your repo. The recommended way is to add it as a encrypted repository/environment secret.

&nbsp;

### 📚 Documentation

Refer to [`action.yml`](https://github.com/darkguy10/ctftime2discord/blob/main/action.yml) for a more comprehensive list of all the required/available configurations.

&nbsp;

### 📜 License

<a href="https://github.com/darkguy10/ctftime2discord/blob/main/LICENSE.md"><img src="https://img.shields.io/github/license/darkguy10/ctftime2discord?style=for-the-badge&labelColor=302D41&color=C9CBFF"/></a>

This repository is released under the MIT license, which grants the following permissions:

- Commercial use
- Distribution
- Modification
- Private use

For more convoluted language, see the [LICENSE](https://github.com/darkguy10/ctftime2discord/blob/main/LICENSE.md).
