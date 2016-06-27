sidewinder
==========

A little trip down memory lane...

I wanted to use [Electron](http://electron.atom.io/) to run Google calendar, inbox, Trello and so on, so that I could close a few of those tabs in my browser! But I didn't want to create and maintain a separate _Electron_ app for each _web_ app, since that would quickly become unwieldy.

So I decided to resurrect an old idea that myself and [Phil Booth](https://github.com/philbooth) worked on nearly 10 years ago. Back then we were building an application framework called Sidewinder that used W3C standards such as XForms and CSS to create desktop applications. It was pretty advanced and we were able to do some impressive things, but as often happens with these kinds of projects, you can sometimes be a little bit too early.

(See [Sidewinder and GCal desktop applications](http://internet-apps.blogspot.co.uk/2006/08/sidewinder-and-gcal-desktop.html) for a quick introduction to the kinds of things we were doing.)

![Google Calendar in the Sidewinder Viewer](http://static.flickr.com/89/222934844_99fd46fe8f_m.jpg)

The core of our project used the SpiderMonkey JavaScript engine to power everything, and wired in 'renderers' -- essentially wrappers around a browser DOM -- that could be written to and controlled, for UI. We provided lots of hooks to make it easy to display and position windows, to add and control native menus, messages, and so on. And we sent back lots of notifications from the renderer to allow the app to control how the renderer behaved, by modifying windows before they were opened, URLs before they were used, `XMLHttpRequests` before they were sent, and more.

In other words...a lot like Electron.

In fact, so much like Electron that it would be really easy to bring forward some of the ideas we had back than for Sidewinder, and put them into an Electron wrapper.

## URLs for Apps

One of the simplest but perhaps most powerful features we had was the ability to create an 'app' using just a URL. The base of the URL would indicate which web page contained the app, and then the fragment part would indicate configuration options such as how large the initial window should be, where it should be positioned, and so on. This meant that only one _desktop app_ was necessary to manage and control many different _web apps_.

The whole URL idea is explained in a blog post of 2007, [Using URLs to pass parameters to web applications, widgets and gadgets](http://internet-apps.blogspot.co.uk/2007/11/using-urls-to-pass-parameters-to-web.html).

More Sidewinder ideas can be seen in [The 10 minute guide to Sidewinder (or 'How to turn a web app into a desktop app without programming')](http://markbirbeck.com/2008/01/14/10-minute-guide-to-sidewinder-or-to/)
