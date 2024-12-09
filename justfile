# Command to add fnm setup to .bashrc and source it for idx
idx-fnm:
    # Add the fnm environment initialization to .bashrc
    echo 'eval "$(fnm env --use-on-cd --shell bash)"' >> ~/.bashrc

# Command to install Node.js using fnm (relies on .node-version)
install-nodejs:
    # Step 1: Ensure the correct Node.js version is installed
    fnm install

# Command to initialize the environment
initialize: install-nodejs

initialize-idx: idx-fnm initialize