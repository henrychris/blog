---
title: 'QSet'
description: The story behind QSet.
date: '2025-10-17'
categories:
  - projects
published: true
---

In November 2024, I was considering moving out of my parent’s home. The power situation had driven me to the edge of insanity as on most days, I had less than 2 hours of electricity. This left me unable to work comfortably, but as an employee, I had no choice in the matter. My workarounds were exhausting. I would leave to work at a nearby lounge or my mom’s office 15 minutes away. Or, I would charge my laptop to 100% overnight and use a 40,000 mAh powerbank to keep it running. I wanted out.

But before I could move, I needed an apartment that ticked all my boxes. There were many boxes, but for this article, only one matters: _I needed to find a place where I could play football nearby_.

I'm a software engineer. I spend all day at a desk, staring at a screen, tapping keys for money. To stay healthy, I play football three times a week. This is crucial because I lack the discipline to exercise at home or go to a gym.

I started researching apartments and nearby football pitches. It was hard to find any. The apartments were pricey and substandard. I remember a quote of 3.5 million naira for a single-room apartment in Magodo. Its bathroom had a shower standing atop the toilet. Even at those prices, finding a nearby pitch and its session times was difficult. I decided to build a solution.

At the time, I was solely a backend engineer and the spells of frontend engineering were still a mystery. I could not build the entire application myself. I worked through my WhatsApp contacts and Twitter mutuals looking for a partner. Most were occupied with work or other projects—except Ibidapo. He said he was 'actually about to ask me the same thing.' What were the odds? We chatted, I mentioned my power struggles, and he suggested I stay at his grandma's place while we built it. So I did.

## A Month At Coker

Ibidapo's grandma lives on Coker Road. The room we stayed in was about twice the size of mine at home—airy, with windows overlooking a busy road. Cars and okadas started zooming past at 6am, always waking me two hours earlier than I wanted.

The room came equipped. A monitor sat on a table opposite the bed, beside a whiteboard covered in tech scrawl we didn't write. Whiteboard sheets were stuck to the wall. In a drawer above the table, we found more sheets—neatly folded, used. Apparently, Ibidapo's grandma had been doing this for years: letting her sons, grandsons and their friends crash at her place while they built things. A one-woman tech incubator.

We wiped down the boards, spread fresh sheets on the wall, and got to work. We didn't have a name for the pitch-finding app yet, so we called it _Project Mbappe_. Every morning, we'd plan the day's tasks. I'd build the backend while Ibidapo handled the frontend between his shifts at Jumia. I started a new job three days after arriving—November 14th—so our windows for deep work were narrow.

![](https://res.cloudinary.com/dit0zbles/image/upload/v1761048141/coker-1_jxdb55.jpg 'The room at Coker, with a sheet we met')

His grandma's assistant, Abigail, kept the house running. Meals followed a schedule: the same rhythm every week. Thursdays and sometimes Fridays, we'd drive to Gbagada to play ball. We tried Saturday once, but ten teams showed up. We didn't go back.

Other days, we'd cruise around Lagos on side quests, noting every pitch we spotted. We took the train to Jumia's office, walked down Coker Road for shawarma (the best I've ever had), visited our friend Ayo down the street. Ibidapo played chess constantly. At the pitch while waiting for our set. On the stairs at the train station. In the break room at Jumia. Anywhere, really.

My laptop crashed twice. I fixed it both times. I lost my Cowry card and had to get a new one. One evening, SARZ—unidentified 'policemen' with guns—tried flagging us down on the freeway. We sped past.

![](https://res.cloudinary.com/dit0zbles/image/upload/v1761048144/coker-2_kovcj7.jpg 'Chess everywhere')

## The Birth of QSet

![](https://res.cloudinary.com/dit0zbles/image/upload/v1761048140/coker-3_y8xh2b.jpg 'Waiting for our set. Ibidapo was playing chess next to me')

Before I continue, let me explain Nigerian football culture and "sets." Some pitches host what Ibidapo and I call drop-in sessions. Anyone can show up during a certain time on a certain day, e.g., every Wednesday between 4-7pm. Each person pays to access the pitch. Then, random teams—or sets—are selected from everyone present. Games usually last 10 minutes. The winner stays on until they lose. If both teams draw, they both come off for the next two teams. Let's carry on.

One day at Gbagada, we were waiting for our set to come in, when the different teams started arguing about who ought to play next. This argument went on, and on, and on. The sun set, the sky went dark and the session ended without any other teams touching the pitch. We headed back and talked about how to resolve the problem. We decided to build something fast and demo it the next day.

![](https://res.cloudinary.com/dit0zbles/image/upload/v1760542148/qset-v0_z5bjys.png 'The first version of QSet')

I did not know how to build complex frontend applications then. But I did know HTML, JavaScript, and CSS. I opened [Claude](https://claude.ai), and within a few hours, we had a working prototype. We returned to Gbagada early the next day and suggested using the app to manage the teams. The day passed without arguments. I immediately realized I needed an undo/redo feature, so I added it before our next visit.

## v0

QSet v0 was a mess: one HTML file, one JS file, and one CSS file. Event listeners were strewn around. I used for-loops to inject HTML into divs. It was nonsense—but it worked. We called it 'set-tool-official' for the first few months. Eventually, I:

- rewrote the code in TypeScript and used Bun to bundle it into a single JavaScript file.
- wrapped the logic into classes for different game modules: timer, undo/redo, and the main game.
- cleaned up the UI to the best of my ability—I am a backend engineer, after all.

A lot has changed since v0. The last commit to the original QSet repository was on February 23rd, 2025. I had learned Svelte, a web framework much easier than React. After building a few toys with it, I started migrating QSet's beautiful single-file mess into a modern framework.

![](https://res.cloudinary.com/dit0zbles/image/upload/v1760542148/qset-html-final_ou5tfk.png 'QSet when I rewrote it in Svelte')

I built components, added toasts, and implemented a service worker for offline use. I released it on February 26. The tweet got 32k views, the application received decent traffic, and we were flooded with feature requests. We have shipped most of them, and redesigned the application too.

![](https://res.cloudinary.com/dit0zbles/image/upload/v1760542148/qset_current_pc9b6w.png 'The current version of QSet')

## Finally...

That's the origin of QSet. It was born from a personal need, hacked together in a few hours, and has been slowly improving ever since. If you're curious, you can check out the latest version at [this link](https://qset.qballxi.com).

I'm working on a new application. If all goes well, you'll see it here in a month.

Thanks for reading.
