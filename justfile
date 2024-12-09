
# Command to add fnm setup to .bashrc and source it for idx
idx-fnm:
    # Step 1: Add the fnm environment initialization to .bashrc
    echo 'eval "$(fnm env --use-on-cd --shell bash)"' >> ~/.bashrc

    # Step 2: Source the .bashrc to apply changes immediately
    source ~/.bashrc

# Command to install Node.js using fnm (relies on .node-version)
install-nodejs:
    # Step 1: Ensure the correct Node.js version is installed
    fnm install
    # Step 2: Use Node.js version from .node-version
    fnm use
    # Step 3: Verify the Node.js version is active
    node --version

# Command to initialize the environment
initialize: install-nodejs

initialize-idx: idx-fnm initialize