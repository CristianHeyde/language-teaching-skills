# Package security and privacy review

Before distributing this package, a reviewer must inspect every file under `skills/`, `shared/`, and `validation/` for:

- learner-identifying details, contact information, account identifiers, or real student records;
- passwords, API keys, access tokens, private keys, or other credentials;
- internal hostnames, private network addresses, or URLs that reveal non-public systems;
- copied proprietary course material or other content whose source does not permit redistribution.

Run `node scripts/validate.mjs` from the package root first. Its automated scan flags common email, Brazilian CPF and phone formats, credential patterns, private-key headers, and internal/private URLs. The scan is a screening aid: it cannot identify every person, secret format, sensitive internal address, or copyrighted passage. Resolve every match and complete the manual review before distribution; record the reviewer and date in the release review, not in this instructional package.
