# AGENTS.md

This file guides AI coding agents and contributors working in this repository.
Follow these rules to keep changes focused, safe, and consistent.

## Scope & Priorities
- Only modify content under `data/` and `index.json` unless explicitly asked.
- Keep contributions safe, realistic, and useful for design mockups.
- Ensure `scripts/generate-index.js` can successfully regenerate `index.json` after changes.

## Repo Map
- `data/`: Source data organized by type.
- `scripts/generate-index.js`: Builds `index.json` from `data/`.
- `.github/workflows/generate-index.yml`: CI job to regenerate index on push to `main` when `data/**` changes.
- `index.json`: Generated catalog used by the plugin.
- `README.md`: Contribution guidance and examples.

## Data File Conventions
- Filenames: kebab-case, descriptive (e.g., `button-labels.json`).
- Encoding: UTF-8; valid JSON (no trailing commas).
- Size limits: images ≤ 5MB each; other JSON files ≤ 1MB.
- Tags: lower-case, concise, relevant.
- Authors (optional): `{"authors":[{"githubUsername":"name","avatarUrl":"https://..."}]}`. If omitted, CI infers from commit history.
- Safety: No sensitive, personal, offensive, or copyrighted content.

## Supported Data Types (schemas)
All files share common fields:
- `name` (string), `description` (string), `datatype` (enum), `isFeatured` (boolean), `data` (object), `tags` (string[]), optional `authors`.

Type-specific `data` fields:
- `string`: `textItems` (string[]), `orderType` (`Random|AsEntered|ReverseOrder`), `prefix` (string), `suffix` (string)
- `number`: `min` (string/number), `max` (string/number), `decimalPlaces` (string/number), `useSeparator` (boolean), `prefix` (string), `suffix` (string)
- `date-time`: `dateFormat` (string), `orderType` (`Sequential|Random|ReverseOrder`), `prefix` (string), `suffix` (string)
- `multiple`: `variables` (array). Each variable: `id`, `name`, `dataType` (e.g., `string|number|date-time`), `config` (matches that type’s `data` structure)
- `json`: `sourceType` (`url|direct`), `url` (string) or `content` (stringified JSON), `orderType` (`Random|AsEntered|ReverseOrder`)
- `google-sheets`: `url` (publicly viewable), `orderType` (`Random|AsEntered|ReverseOrder`)
- `image` collections: place JSON + images in `data/image/<collection>/`
  - JSON `data.images`: `[{"url":"<filename.jpg>","name":"Display Name"}]`
  - Keep `url` as the filename only; the index generator prefixes with the folder name.

## Local Workflow
Prereq: Node.js 20+. Optional `.env` with `GITHUB_TOKEN` to enrich metadata.

Typical flow:
1. Add or edit files in `data/` following schemas above.
2. Run `node scripts/generate-index.js` to refresh `index.json`.
   - If `GITHUB_TOKEN` is missing or offline, the script falls back to filesystem timestamps.
3. Validate `index.json` was updated and looks correct.

## Contribution Quality Checklist
- Valid JSON and consistent schema per data type.
- Reasonable sizes; images present and referenced correctly.
- Descriptive `name`/`description`; relevant `tags`.
- Safe, professional content suitable for mockups.
- Image sets: all files exist; filenames match entries; keep within folder.

## Commit & PR Guidelines
- Commit message: `chore(data): add string — button labels` or `chore(data): update image — rad-faces`
- Include updated `index.json` in the same commit.
- Do not change CI or generator scripts unless requested.
- Keep diffs minimal and focused on the data being added/updated.

## Quick Recipes
- Add new string dataset:
  - Create `data/string/<kebab-name>.json` with required fields.
  - Run `node scripts/generate-index.js` and include `index.json`.
- Add new image collection:
  - Create folder `data/image/<collection>/`, add images and one JSON file describing them.
  - In JSON, set each `images[].url` to the image filename only.
  - Run the index script and commit changes.

## Don’ts
- Don’t add sensitive, personal, or offensive data.
- Don’t hardcode absolute paths or external secrets.
- Don’t modify `scripts/generate-index.js` or CI unless explicitly asked.

Following these rules keeps the library clean, predictable, and easy to use in the Datapaw plugin.

