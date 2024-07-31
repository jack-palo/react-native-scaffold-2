FE_DIR="fe"
E2E_DIR="e2e"
DOCU_DIR="docusaurus"

# Docusaurus
#------------
goal_docusaurus() {
  echo "--- Initialize Docusaurus ---"

  # Check if the node_modules folder exists in the docusaurus folder
  echo "$DOCU_DIR: checking docusaurus for node_modules folder"
  if [ ! -d "$DOCU_DIR/node_modules" ]; then
    echo "$DOCU_DIR: node_modules folder doesn't exist"
    echo "$DOCU_DIR: installing dependencies"
    yarn --cwd $DOCU_DIR
  fi

  # Run and open Docusaurus
  echo "$DOCU_DIR: running docusaurus"
  yarn --cwd $DOCU_DIR start
}

#==============================
# Main
#==============================
if type goal_$1 &>/dev/null; then
  "goal_$1" "${@:-2}"
else
  echo "usage: $0 <goal>
    goal:
    docusaurus                              -- open docusaurus
  "
  exit 1
fi
