---
layout: blocks
title: Wunder Fleet | Technology for car, bike & scooter sharing
date: 2019-01-08T23:00:00.000+00:00
permalink: "/wunder-fleet"
published: true
lang: en
lang-ref: wunderfleet
page_sections:
- template: navigation-header-w-button
  block: header-2
  menu: wunder-main
  sub_logo: "/uploads/global/Wunder_Fleet_White.svg"
  cta:
    url: "#section-contact"
    button_text: Contact
- template: hero-banner-w-image
  block: hero-2
  headline: Technology powering <strong>car & scooter sharing</strong> worldwide
  cta:
    button_text: Contact Us
    url: "#section-contact"
    enabled: true
  cta_2:
    url: "#main-video"
    button_text: Watch Fleet Film
    enabled: true
  background_video:
  show_logos: true
  background_image: "/uploads/global/Fleet-Header-Image_40.jpg"
- block: wunderfleet-main
  subdirectory: static
- template: detail-content
  block: contact-form
  title: Let's Talk
  content: We'll get your fleet up and running in no time! Send over some info and
    we'll get in touch in the next 24h.
  headline: Let's Talk
  background_image: "/uploads/2019/02/05/skyline-bg@2x.jpg"
- block: custom-html
  content: "</main>"
- template: simple-footer
  block: footer-1
menu:
  wunder-main:
    weight: 6
    parent: solutions
    identifier: fleet

---