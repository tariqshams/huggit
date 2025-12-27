# Huggit

**Huggit** is a high-performance based on NodeJS CLI tool designed for developers who want to maintain their code across both **Hugging Face** and **GitHub** simultaneously. With one command, sync your progress to both platforms. Instead of using github actions to keep your hugging face repo updated, use huggit.

[Huggit](https://tariqshams.github.io/huggit/)
---

## For Users

### Installation

Install `huggit` globally using npm:

```bash
npm install -g huggit
```

### Quick Start

1. **Initialize Huggit** in your local git repository:
   ```bash
   huggit init
   ```
   *This will prompt you for your Hugging Face and GitHub repository URLs and create a `.huggit` config file.*

2. **Push your changes**:
   ```bash
   huggit push
   ```
   *This automatically detects your current branch and pushes to both origins.*

### Color Theme
Huggit features a sleek **Orange and Black** terminal interface, making it easy to distinguish sync progress and status updates.

---

## For Contributors

We welcome contributions! To set up the project locally for development:

### Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/tariqshams/huggit.git
   cd huggit
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Link for local testing**:
   ```bash
   npm link
   ```
   *Now the `huggit` command will point to your local development files.*

### Project Structure
- `bin/huggit.js`: Executable entry point.
- `src/index.js`: Main CLI command definitions.
- `src/commands/`: Implementation of `init` and `push`.
- `src/utils/theme.js`: Visual styling and terminal components.

### Development Workflow for Contributors
- Follow the **senior-level code quality** standards: modular, clean, and well-commented.
- UI changes should adhere to the **Orange (#FFA500)** and **Black** theme.
- Before submitting a PR, ensure your changes work across different branches and repository types.
- While I'm considering rust as the next major version, for now, we'll stick to nodejs since the bottleneck isn't the language but the API calls through git.
---

## Future Plans

- A way of handling large files, such as the GBs taken up by models.
- Perhaps reading directly from git config to get the remote urls.
- Perphaps a way of creating the repos for both platforms at once.
Open to suggestions since I built this tool for the community.

## License

This project is licensed under the [Apache-2.0](LICENSE) License. Developed by Tariq Shams.
