# Auto Commit Generator

<img width="1169" alt="스크린샷 2024-05-30 오후 4 53 48" src="https://github.com/love1ace/auto-commit/assets/147500032/d772669f-230f-4799-ac74-676c71027af0">

## Introduction

**Auto Commit Generator** is a Node.js script that automates the process of generating multiple Git commits over a specified date range. This tool is useful for developers who need to simulate activity in their repositories or test CI/CD pipelines with numerous commits.

1. **Before**:

2. **After**:
   


## Installation

To install and use Auto Commit Generator, you need to have Node.js installed on your machine.

1. **Clone the repository**:
    ```sh
    git clone https://github.com/love1ace/auto-commit.git
    cd auto-commit
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

    
## Usage

1. **Set config.json**:
```json
{
  "repository": "https://github.com/yourusername/your-repo.git",
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD", 
  "commitMessage": "your commit message",
  "minCommits": 1,
  "maxCommits": 5,
  "gitUser": "githubusername", 
  "gitEmail": "githubemail@example.com" 
}
```

2. **Run the script using Node.js**:
    ```sh
    node auto-commit.js
    ```
    
This will read the config.json file, generate the specified number of commits over the date range, and push them to the specified repository.
