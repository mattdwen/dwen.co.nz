---
layout: post
title:  "ASP.NET Core RC2 and Azure"
date:   2016-06-15 10:37:00 +12:00
---

I've been running a <strike>ASP.NET vNext</strike> <strike>ASP.NET 5</strike>
ASP.NET Core site on Azure for about a year now. It's taken me a while, but
I've finally upgraded it to RC2.

However, when deploying to Azure, I was getting an error page with **The
specified CGI application encountered an error and the server terminated the
process** on the site, and nothing else.

Nothing in the error logs, and not much help on the web. There were some
suggestions that it just didn't work with the free and shared subscription
plans, but this was already on the basic.

I scaffolded out a whole new RC2 site, and deployed that fine. So I rebuilt the
site using the new RC2 template, which again worked fine.

When I deployed from Visual Studio.

A ha! I was using TeamCity to do the real deployment - and that was always
giving me the CGI error.

After a lot of comparing files, I found that the generated `web.config` was
different when using `dotnet publish` from the CLI, and from Visual Studio. In
the VS output logs I could see it was setting a `DOTNET_CONFIGURE_AZURE`
environment variable.

![DOTNET_CONFIGURE_AZURE](/img/2016/aspnet-rc2/dotnet_configure_azure.png)

I couldn't find a way to set the environment variable though so that when
running `dotnet publish` from the CLI that I'd get the same output as from VS.

The `web.config` I was getting which was "bad" looked like:

```
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModule" resourceType="Unspecified"/>
    </handlers>
    <aspNetCore processPath="%LAUNCHER_PATH%" arguments="%LAUNCHER_ARGS%" stdoutLogEnabled="false" stdoutLogFile=".\logs\stdout" forwardWindowsAuthToken="false"/>
  </system.webServer>
</configuration>
```

Somewhere along the lines the parameters were not getting replaced. The working
version of `web.config` is:

```
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModule" resourceType="Unspecified" />
    </handlers>
    <aspNetCore processPath=".\Focus.exe" arguments="" stdoutLogEnabled="false" stdoutLogFile=".\logs\stdout" forwardWindowsAuthToken="false" />
  </system.webServer>
</configuration>
```

`.\Focus.exe` comes from my project name, and is the generated exe from the new
RC2 structure.

After some more digging I found that running `dotnet publish` from above the
`project.json` directory has this problem every time. I've filled a bug for this
on [GitHub](https://github.com/dotnet/cli/issues/3576).
