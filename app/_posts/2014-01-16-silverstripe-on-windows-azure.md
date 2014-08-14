---
layout: post
title: SilverStripe on Windows Azure
date: 2014-01-16 21:47:44 +13:00
---
While SilverStripe should largely work out of the box under IIS, I ran into a few issues getting it running on Azure.

I created a new free Azure custom web site so I could create an associated MySQL database at the same time. I then downloaded everything locally using the recommended [SilverStripe Installer](http://doc.silverstripe.org/framework/en/trunk/installation/composer) via composer, then ftp'd straight into the new Azure account.

The installer gave me some warnings about **fileinfo** not being enabled, and  **URL rewriting** being undetectable. After a bit of digging and getting no-where I ran the installer anyway, which completed most steps, but failed at **Friendly URLs are not working**.

Trying to load the site at this stage gave me the page content, but all the stylesheets and images were missing. Viewing the output source showed that all links were prefixed with **index.php**.

I downloaded the following files, knowing that the installer modifies them:

 - .htaccess
 - index.php
 - web.config
 - mysite/_.htaccess
 - mysite/_config.php
 - mysite/_config/config.yml

Inside **index.php** I changed the **BASE\_SCRIPT\_URL** definition from `'index.php/'` to `''`:

`define('BASE_SCRIPT_URL','');`

This allowed the front page to work, but all other URLs resulted with a 404.

The redirection certainly wasn't working. Since I knew what I wanted from an .htaccess file, and wasn't familiar with the IIS URL rewriting rules, I found [this great post](http://blog.mdavies.net/2013/05/25/azure-websites-htaccess-rewrite-web-config/) about the IIS add-on URL Rewriter which will convert .htaccess rules to an IIS config for you. This is the web.config which I ended up with:

<script src="https://gist.github.com/mattdwen/09b01b16621b6c5a99c9.js"></script>

Now all the pages were working. I ran a /dev/build to ensure everything was correct after the semi-completed install and I was away.
