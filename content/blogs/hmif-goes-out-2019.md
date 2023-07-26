---
blog: true
title: HMIF Goes Out 2019!
description: My experience in HMIF Goes Out 2019, visiting several offices
author: mkamadeus
date: 2019-08-12
duration: 7
---

This is kinda a lengthy blogpost which tells the story about my first exposure to startups and tech comapnies up close. I am also writing my thoughts and summary of the presentation. This information provided in this writing may not be accurate as this was the information I got back in 2019. I hope this blog post would be interesting to read 🙂

::TableOfContents
::

## Departure and Arrival

All of us at this event left at 05.30 WIB in the morning. At that time it was still quite dark; only stopped at one rest area. Fortunately, there was no traffic jam when we left.

We, some of the HMIF (Bit, Unix, and Decrypt) crowd went to visit the OVO office in Kuningan! The office is located in Lippo Kuningan Building.

We took the elevator to the 18th floor; one of the floors of the OVO office to enter this particular room prepared for us.

<figure >
  <img src="/static/hmif-goes-out-01-room.jpeg" alt="Figure" lazy="true" width="400" height="300">
  <figcaption>The presentation room.</figcaption>
</figure>

The building also requires a keycard to enter and exit, so we were given a keycard before entering the office.

<figure >
  <img src="/static/hmif-goes-out-02-card.jpeg" alt="Figure" lazy="true" width="300" height="400">
  <figcaption>The keycard we use to enter the office 🙂</figcaption>
</figure>

We were also given a sticky note containing the wifi password, while waiting for them to prepare a presentation about OVO! I couldn't connect though, I don't know why.

<figure >
  <img src="/static/hmif-goes-out-03-pass.jpeg" alt="Figure" lazy="true" style="object-fit: cover;width: 500px; height: 500px" width="500" height="500">
  <figcaption>The sticky note.</figcaption>
</figure>

## Presentation


### General Information

Then came the presentation time! They opened the presentation with these statistics from a certain data source:

- Internet users in Indonesia are around **50%** of the total population.
- Mobile phone users in Indonesia are around **60%** of the total population.
- Social media users in Indonesia are around **49%** of the total population.

From the data above, they also concluded that the total internet usage of a person in Indonesia averages around **8 hours and 51 minutes**, roughly the same as working hours. This is hardly surprising, as people already work with the internet in every aspect of their lives.

There is other statistics that is interesting to me:

> **23%** of the population in Indonesia has a bank account, and around 90% of transactions are done in cash.

That **90%** is a BIG number, isn't it? Therefore, OVO's mission it to become the no. 1 cashless payment in Indonesia. *With big market comes great opportunity!*

OVO itself has 3 types of customers; not only us as users because OVO is an intermediary! The types are as follows:

1. Personal users
2. Small merchants
3. Merchant Channel, i.e the more modern ones; e.g: the ones in the shopping mall

### Product Team

Here comes the more technical side of the presentation (which is the interesting bit 😀)! First up were two people who are Product Managers; different from PM/Project Managers. They are ITB alumni named Bryan from Mechanical Engineering and Arya from Systems and Information Technology (STI)!

<figure >
  <img src="/static/hmif-goes-out-04-product.jpeg" alt="Figure" lazy="true" style="object-fit: cover;width: 500px; height: 500px" width="500" height="500">
  <figcaption>Representatives for product managers.</figcaption>
</figure>

Product Manager is simply bringing together the relevant fields to create a product, such as UX, Tech, and Business. His job is to take care of documents and meetings to unite the minds of the 3 fields. Sometimes it's difficult to unite the wishes of 3 fields; there must be a clash. This Product Manager's job is to embrace the 3 fields, so that all their expectations are met.

In order to work well, a product manager will have their own team, where each of the team will hold a specific type of feature, such as OVO Payment with QR, etc. There are around 20-30 product managers at OVO.

The features they work on are as follows:

- Core/OVO Cash
- Offline Payment
- Online Payment
- Deals & Loyalty
- Lending
- Investment
- Insurance
- and others (including features that are still confidential)

### Data Engineering

<figure >
  <img src="/static/hmif-goes-out-05-data-tech.jpeg" alt="Figure" lazy="true" style="object-fit: cover;width: 500px; height: 500px" width="500" height="500">
  <figcaption>Engineer representative from OVO 🤖</figcaption>
</figure>

Next, there was a presentation from a Big Data representative, Etsy, an ITB alumni majoring in Informatics Engineering (same major as mine!). She talked about what kind of jobs are done by someone who works in the Big Data field.

Since OVO is a financial technology company, working with data and transaction would be inevitable. In essence, what I got about Big Data work is as follows:

1. Extracting data from users **(Data Source)**
2. Processing data so that it can be used from existing raw data **(Data Engineering)**
3. Storing data in storage/database **(Data Storage)**
4. Creating products from the results of data analysis **(Data Science Product)**
5. Customer 360 (more on this below)
6. Creating a data dashboard for merchants so that merchants can easily analyze prospects and future goals, as well as customer analysis **(Dashboard)**
7. Perform data monetization; that is to **create features/businesses** from the data obtained.

The important thing to discuss from this field is Data Science Product. From the results of data processing, there can be many possible products, both physical and not, that can be initiated or executed.

One example is Customer 360, which is one of the features created and used by OVO in order to obtain preference data from each of its personnel/users. OVO does not take personal data, but rather the user's purchasing preferences; such as F&B, cosmetics, etc.

OVO has also created a smart vending machine that is integrated with OVO itself. This is one example of a product created from the results of data analysis. This vending machine, for example, can already be seen in several Lippo Malls, such as the one in Karawang.

Perhaps, a big difference from other competitors is that OVO opens up opportunities for app developers, both small and starups, to integrate OVO payment into their applications. OVO has an open API system, which means that the OVO system can be accessed from applications outside OVO, such as Grab in Indonesia. Of course, without saying you would need to register to them first.

In addition, OVO also has a fraud detection system, dashboards as mentioned earlier, and one interesting feature which is dubbed as Complex Event Processing (CEP). For example, we can see that each person's OVO account gets different advertisements and promotions based on certain events or preferences. It happened because of certain combinations of preferences and events that happen and the system decides to give that certain promotions. That is an example of the results of the CEP processing!

### Technology and General Engineering

The last presentation section was no less exciting; the Tech(nology) section! This Tech field is very close to us, HMIF ITB students (and me). Etsy is the one still explaining. Roughly speaking, this Tech field is divided into 5 fields:

- Front-end (Android and iOS app)
- Back-end (API team)
- Quality Assurance (QA)
- DevOps
- Database Admin (DBA)

Front-end takes care of the interface and when users use the app. Front-end especially works closely with the UI/UX field to implement interfaces.

Back-end is an important part of OVO, because it's in contact with users. They also work on the many core parts of OVO. They work on the following features:

- OVO Payment in multiple ways:
  - QR Codes
  - EDC/Electronic Data Capture
  - Via phone number
- Loyalty System (OVO Points system)
- User Management
- Financial System

Some of the programming languages used are Java as the core, PHP as the server side, a little bit of Node.js and Golang are also used. I guess this is not a big secret since they revealed this in their presentation 😅

QA/Quality Assurance is a field within Tech that ensures that the designed features match the initial approved design. They relate a lot with testing features and creating testcases for products.

DevOps is the field that takes care of server provisioning issues. Quoting her, an analogy for this would be something like:

> Front-end discusses about how the dish is serves. Back-end relates to who and how the dishes are created in the kitchen, and DevOps is the one who provides the ACTUAL kitchen.
 
OVO uses the Continuous Integration and Continuous Delivery (CI/CD) principle in its development. In their development, they use Jenkins and AWS/Amazon Web Services, and also use Terraform to provision the server.

Last but not least, there is the DBA/Database Admin. The job is to take care of the database, in short. They use PostgreSQL, MySQL, and MariaDB. They work to maintain reliability for their database and may improve on existing databases.

## Conclusion

More or less, that was the whole presentation. One more important thing they said was that we must be able to improve our soft skills such as communication, and we must understand our own value in the eyes of the company.

It was a really eye-opening experience to learn this back in the day, since I learned a lot about how the team is structured in startups. Quite accurate to what startups like in the future. It's interesting to understand how they communicate and coordinate which each other to create a big, coherent, system.

Another fun detail; if you successfully answer questions from them, you will be given a Xiaomi powerbank like this one.

<figure >
  <img src="/static/hmif-goes-out-06-powerbank.jpeg" alt="Figure" lazy="true" style="object-fit: cover;width: 500px; height: 500px" width="500" height="500">
  <figcaption>Xiaomi powerbank that my friend got.</figcaption>
</figure>

## Extra Photos!

Bonus section showing the pictures I got.

<figure >
  <img src="/static/hmif-goes-out-07-wait.jpeg" alt="Figure" lazy="true" style="object-fit: cover;width: 500px; height: 500px" width="500" height="500">
  <figcaption>Waiting time in the presentation room.</figcaption>
</figure>

<figure >
  <img src="/static/hmif-goes-out-08-bag.jpeg" alt="Figure" lazy="true" style="object-fit: cover;width: 500px; height: 500px" width="500" height="500">
  <figcaption>This small bag contains SWAG from OVO!</figcaption>
</figure>

<figure >
  <img src="/static/hmif-goes-out-09-office.jpeg" alt="Figure" lazy="true" style="object-fit: cover;width: 500px; height: 500px" width="500" height="500">
  <figcaption>OVO's front office.</figcaption>
</figure>

