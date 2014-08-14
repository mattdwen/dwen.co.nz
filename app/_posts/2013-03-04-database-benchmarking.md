---
layout: post
title: Database benchmarking
date: 2013-03-04 17:19:39 +13:00
---
I have performance issues. And it's nothing a little blue pill is going to solve.

I've had to disable functionality in a project I've been working on recently, because the execution time was waaaay to slow for a website. It's a PHP-MySQL project, and I was expecting it to be slow, but not that bad; I'm talking minutes to render a filter system.

After some benchmarking of PHP, I turned to checking out the DB performance. I started executing specific queries directly against the DB. When one of the queries took 25 seconds to execute, I took a hunch and ran the same query against the same data in Microsoft SQL Express 2008 R2. Woah.

The data isn't complex. Three tables joined, one of products at about 1,600 rows, and some property metadata with about 6,100 distinct property values, and 15,700 relationships between the products and the properties.

Here's the query:

```
SELECT DISTINCT
  prop.id AS propId,
  prop.value,
  pTax.name as taxonomy,
 (SELECT COUNT(property_relationship.id) FROM property_relationship WHERE propertyId = propId) AS productCount
FROM property AS prop
  INNER JOIN property_taxonomy AS pTax ON prop.taxonomyId = pTax.id
  INNER JOIN property_relationship AS pRel ON prop.id = pRel.propertyId
WHERE pTax.isSearchable = 1
  AND pTax.taxonomy = 'product_property'
```

So, a bit of a join, a sub-select to get a count, and I want distinct results. 19 Rows returned. Turns out MySQL just plain sucks.

![](/content/images/2014/Jan/DBBechmark.png)

That's execution time in seconds. All numbers are an average of 3 executions after a My MySQL server is running straight on my MacbookPro i7 8GB. The SQL2008 and Postgre are both running on a Windows 8 VM on the same hardware, with half the CPU and RAM available.

Both the DB installs on the VM were clean, with no optimisation, and I used a very half ass tool to get the data between platforms.

For the record, the MSSQL execution time was 0.15s.

I am at a total loss to explain this.
