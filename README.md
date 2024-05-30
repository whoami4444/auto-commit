# Auto Commit Generator

<img width="1169" alt="" src="https://github.com/love1ace/auto-commit/assets/147500032/a333cb9e-7f97-4b54-ba17-248694fc733d">


## Introduction

**Auto Commit Generator** is a Node.js script that automates the creation of multiple Git commits over a specified date range.
<br><br>
## Before / After


**Before**:

<img width="765" alt="스크린샷 2024-05-30 오후 5 26 31" src="https://github.com/love1ace/auto-commit/assets/147500032/4c2d6336-a768-46e4-9751-198db730d82b">



**After**:

<img width="765" alt="스크린샷 2024-05-30 오후 5 39 42" src="https://github.com/love1ace/auto-commit/assets/147500032/73e40b1c-3fe1-42dc-a139-04f22d2e6ec0">

   


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
