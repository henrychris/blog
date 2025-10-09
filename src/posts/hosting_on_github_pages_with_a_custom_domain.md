---
title: Hosting on GitHub Pages With a Custom Domain
description: I'm working on it.
date: '2024-12-30'
categories:
  - github_pages
published: true
---

I’ve been working on a project for over a month now. It’s currently a static page with a single(bundled) JavaScript file hosted on GitHub Pages.

I purchased a domain from Domain King so I could attach it to my site, instead of using the `ORGANISATION/USER.github.io` domain provided by GitHub. However, there was a problem.

With the domain attached, my site was no longer accessible over HTTPS, so I needed to add SSL. GitHub provides great [documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) on this, and the setup is usually straightforward — update DNS records, and wait a few minutes.

_Unfortunately_, Domain King requires an additional payment for DNS management, so I needed an alternative solution. Enter Cloudflare.

## Step 1 - Add Your Domain To Cloudflare

1.  **Create a Cloudflare Account**: Sign up at [Cloudflare](https://www.cloudflare.com/) and add your domain.

![](https://miro.medium.com/v2/resize:fit:700/1*5ZuQ61LSP3kL4a9kyvcMyw.png 'Connect a domain on Cloudflare')

2. **Get Cloudflare Nameservers**: Cloudflare will provide two nameservers specific to your domain.

3. **Update Domain King Nameservers**: Log in to your Domain King account and replace the default nameservers with those provided by Cloudflare.

**Note**: Nameserver changes can take up to 24 hours to propagate, but they often complete sooner. Once this step is done, Cloudflare will manage your domain’s DNS records.

![](https://miro.medium.com/v2/resize:fit:700/1*rOt_YaWygrX3BlTU25blUA.png 'Change nameservers on Domain King')

## Step 2 - Add DNS Records For GitHub Pages

With Cloudflare managing your DNS, you’ll now add records to point your domain to GitHub Pages. These records tell the internet where your website is hosted. See this [page](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) for more information.

### Proxy Status

In Cloudflare’s DNS management interface, you’ll see a switch for “Proxy status.” This setting determines whether Cloudflare acts as an intermediary (proxy) between your visitors and the origin server.

For GitHub Pages, proxying must be disabled because GitHub needs direct access to your DNS records to validate your configuration and issue an SSL certificate.

Ensure all relevant DNS records are set to **DNS only** to prevent issues with SSL generation.

![](https://miro.medium.com/v2/resize:fit:700/1*uHLj46lfsU3BFzrk1JMYkQ.png 'Add a DNS record on Cloudflare')

Set all records to **DNS only** (unproxied) so that GitHub can validate your configuration and generate an SSL certificate.

![](https://miro.medium.com/v2/resize:fit:700/1*POpxhE8jp0zR7QMHeM1e1Q.png 'Correct DNS configuration')

### A Records

Add the following **A records** with the record name set to `@` (root domain):

- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

### AAAA Records

If you want to support IPv6, add the following **AAAA records** with the record name set to `@`:

- 2606:50c0:8000::153
- 2606:50c0:8001::153
- 2606:50c0:8002::153
- 2606:50c0:8003::153

These DNS records _tell_ the Internet that your domain points to GitHub pages.

### Subdomain or not?

If you own a domain like `example.com`, you can choose to link either the main (apex) domain `example.com` or a subdomain such as `blog.example.com` to your GitHub Pages site. The process involves adding the relevant **CNAME records**:

- **Apex Domain**: Add a CNAME named `www` with a target of `USERNAME.github.io` or `ORGANIZATION.github.io`, depending on whether the repository belongs to a user or an organization.
- **Subdomain**: Add a CNAME named after the subdomain (e.g., `blog`) with a target of `USERNAME.github.io` or `ORGANIZATION.github.io`. For instance, to create a subdomain for `blog.example.com`, create a CNAME named `blog` pointing to the appropriate GitHub Pages target.

## Step 3 - Configure GitHub Pages

1.  **Add Custom Domain**: Go to the “Pages” section in your repository’s settings and enter your custom domain.
2.  **Save and Wait**: GitHub will automatically generate an SSL certificate. This process may take a few minutes to several hours.
3.  **Enforce HTTPS**: Once the certificate is ready, enable the “Enforce HTTPS” option in the same settings.

![](https://miro.medium.com/v2/resize:fit:576/1*9-UKY7sG1jO9bWQrpO8bRA.png 'Custom Domain settings on GitHub')

## Troubleshooting

### Check DNS Propagation

Use tools like [whatsmydns.net](https://www.whatsmydns.net/) to verify that your DNS changes have propagated globally.

### Test Your Website

Access your site over both HTTP and HTTPS to ensure it’s accessible and secure.

### Common Issues

- **Improper DNS Configuration**: Double-check that all required records are present and set to “DNS only.”
- **SSL Certificate Delays**: Be patient; GitHub’s SSL generation can take time.

## Alternatives

If you prefer, you can use Cloudflare to manage SSL instead of GitHub. Here’s how:

1.  Set all DNS records to **proxied** in Cloudflare.
2.  In Cloudflare’s “SSL/TLS” settings, choose the “Full” SSL option.

## Conclusion

By following these steps, you can host your website on GitHub Pages with a custom domain. Whether you use GitHub’s SSL or opt for Cloudflare, this setup ensures your site is both accessible and secure.

You should also consider switching to [Spaceship](https://www.spaceship.com/) over Domain King, like I have.
