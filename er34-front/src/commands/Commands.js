const Commands = [
    {
        chars: "cc",
        name: "Copy to clipboard",
        description: "Copy to clipboard the URL of the current selected image",
        args: [
            {
                canBe: [
                    {
                        default: "z"
                    },
                    {
                        chars: "z",
                        description: "Copy direct image URL"
                    },
                    {
                        chars: "x", 
                        description: "Copy booru URL linking to the post"
                    },
                    {
                        chars: "c",
                        description: "Copy thumbnail URL"
                    }
                ]
            }
        ],
        execute: "copyToClipboard"
    }
]
export default Commands;