

const getCommitResponse = async (commitData) => {
    return {
        oid: commitData.sha,
        message: commitData.commit.message,
        author: {
            name: commitData.commit.author.name,
            date: commitData.commit.author.date,
            email: commitData.commit.author.email
        },
        committer: {
            name: commitData.commit.committer.name,
            date: commitData.commit.committer.date,
            email: commitData.commit.committer.email
        },
        parents: commitData.parents.map(parent => ({ oid: parent.sha }))
    };
};


// Function to transform GitHub API response


const getCommitDiffData = async(commitData) => {
    const files = commitData.files || [];
    return files.map(file => {
        const hunks = [];
        const lines = file.patch.split('\n');
        let currentHunk = null;

        lines.forEach((line, index) => {
            if (line.startsWith('@@')) {
                if (currentHunk) {
                    hunks.push(currentHunk);
                }
                currentHunk = {
                    header: line,
                    lines: []
                };
            } else if (currentHunk) {
                currentHunk.lines.push({
                    baseLineNumber: index + 1,
                    headLineNumber: index + 1,
                    content: line
                });
            }
        });

        if (currentHunk) {
            hunks.push(currentHunk);
        }

        return {
            changeKind: file.status.toUpperCase(),
            headFile: {
                path: file.filename
            },
            baseFile: {
                path: file.filename
            },
            hunks: hunks
        };
    });
};

module.exports = {
    getCommitResponse,
    getCommitDiffData
}
