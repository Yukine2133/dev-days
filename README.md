# Dev Days

**Dev Days** is a web app that analyzes any **public** GitHub repository and provides insightful statistics about the development activity within it. Simply enter the URL of any repository—whether it's yours or someone else's—and explore detailed commit-based analytics that help you understand coding patterns, productivity trends, and more.

---

## Usage

1. **Enter a GitHub Repository URL:** Paste the URL of any **public** GitHub repository. _(Private repositories are currently not supported.)_
2. **Analyze Commits:** The app will retrieve commit data and process it for analysis. _(Depending on the repository size, this may take a few moments.)_
3. **Explore Insights:** Browse through various statistics, including commit patterns, activity heatmaps, and more.

---

## Features

- **Total Commits**: Displays the total number of commits made in the repository.
- **Project Duration**: Shows how long the project has been active based on the first and last commits.
- **Peak Activity**: Identifies the time period when the repository had the highest commit activity (e.g., by hour, day, or week).
- **Most Active Day**: Highlights the specific day with the most commits.
- **Longest Streak**: Tracks the longest consecutive daily commit streak.
- **First Commit**: Provides the exact date of the repository's first commit.
- **Commit Patterns**: Shows what times of the day and week the contributor(s) are most active, with visual breakdowns.
- **Most Common Commit Words**: Analyzes commit messages to display frequently used words.
- **Commit Activity Heatmap**: Visualizes daily commit frequency in a heatmap for a quick activity overview.

---

## Tech Stack

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Framer-motion**s
- **lucide-react**
- **GitHub API**

---

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Yukine2133/dev-days.git
   cd dev-days
   ```

2. **Create an environment file**

   In the root of the project, create a `.env.local` file and add your GitHub access token:

   ```bash
   GITHUB_ACCESS_TOKEN=your_github_access_token_here
   ```

   > **Note:** The GitHub access token is required to avoid API rate limits and ensure smooth data retrieval.

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **View the app**

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---



## About the Project

**Dev Days** was built to provide developers with an easy way to visualize and understand commit activity across any GitHub repository. By offering detailed insights into development timelines, commit patterns, and productivity trends, Dev Days helps you reflect on coding journeys—whether they're your own or others'.
