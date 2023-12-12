alias gcm='function __gcm() { git add . && git commit -m "$*"; unset -f __gcm; }; __gcm'
alias commit='function __commit() { git add . && git commit -m "$*"; unset -f __commit; }; __commit'
alias pull='git pull'
alias push='git push'
alias gp='git push'
alias status='git status'
alias gs='git status'

echo
echo "Aliases loaded for the terminal session. To remove, close the terminal or start a new session."
echo
echo "Options:"
echo "    ga -> git add ." 
echo "    gp -> git push"
echo "    gs -> git status"
echo
echo "    gc -> git commit -m \"<comment>\""
echo "        Example: gc first commit with no quotes"
echo
echo "   gac -> git add . && git commit -m \"<comment>\"" 
echo "        Example: gcm another commit with no quotes"
echo
echo "   gcm = gac"
echo
echo Have fun!
echo
