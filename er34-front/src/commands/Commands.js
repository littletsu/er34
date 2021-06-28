const Commands = [
    {
        chars: "cc",
        // for autocomplete
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
        execute: (commandTab) => {
            let iLState = commandTab.props.imageList.state;
            
            navigator.clipboard.writeText(iLState.images[iLState.iSelected].sample_url).then(() => {
                console.log("Copied")
            })
        }
    },
    {
        chars: "x",
        name: "Change tab",
        description: "Changes to another tab specified by the user",
        args: [
            {
                canBe: [
                    {
                        default: "z"
                    },
                    {
                        chars: "z",
                        // BEFORE THIS CLOSED THE WINDOW BUT IT DOESNT WORK AHSDHSJK
                        description: "Create a new tab and change to it"
                    },
                    {
                        chars: "x", 
                        description: "Create a new tab and change to it"
                    },
                    {
                        chars: "c",
                        description: "Set URL for creating new tabs"
                    },
                    {
                        chars: "v",
                        description: "Get current URL for creating new tabs"
                    }
                    // TODO: add arg: Close tab, and remember current state
                ]
            },
            {
                canBe: [
                    {
                        default: "*"
                    },
                    {
                        chars: "*",
                        description: "If \"c\" or \"v\" is used, specifies the new tab URL"
                    }
                ]
            }
        ],
        defaults: {
            tab: "https://www.youtube.com/"
        },
        execute: (_, args, thisCmd) => {
            console.log(args[0])
            switch(args[0]) {
                
                case "z":
                case undefined:
                default: // stfu lint
                case "x":
                    window.open(localStorage.getItem("tab") || thisCmd.defaults.tab, "_blank").focus();
                    break;
                case "c":
                    localStorage.setItem("tab", args[1])
                    break;
                case "v":
                    // TODO: Use an actual element in the page to display stuff
                    alert(localStorage.getItem("tab") || thisCmd.defaults.tab);
                    break;
            }
        }
    },
    {
        chars: "tag",
        name: "Change tags displayed",
        description: "Changes the images tags",
        args: [
            {
                canBe: [
                    {
                        default: "*"
                    },
                    {
                        chars: "*",
                        description: "A valid tag from the booru"
                    },
                    
                ]
            }
        ],
        execute: (commandTab, args) => {
            commandTab.props.imageList.fetchThumbnails(args.join(' '));
        }
    }
    ,
    {
        chars: "z",
        name: "Refresh images",
        description: "Refresh images to get new ones (takes some time to update if there is new images)",
        args: [],
        execute: (commandTab) => {
            commandTab.props.imageList.fetchThumbnails();
        }
    }
]
export default Commands;