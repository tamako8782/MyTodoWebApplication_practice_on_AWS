#!/bin/bash

###################github variablesへの登録のために実施###################

## リポジトリ情報を設定 #########################
OWNER="tamako8782"
REPO="MyTodoWebApplication_practice_on_Azure"
VARFILE="var.yml" 

## yqとghがインストールされていることを確認 #########################

if ! command -v yq &> /dev/null; then
    echo "yq could not be found, please install it."
    exit 1
fi

if ! command -v gh &> /dev/null; then
    echo "gh CLI could not be found, please install it."
    exit 1
fi

## var.ymlから変数を読み込む #########################

VARIABLES=$(yq eval 'keys | .[]' "$VARFILE")

## 変数をGitHub Actionsの変数として設定 #########################

for VAR in $VARIABLES; do
    VALUE=$(yq eval ".$VAR" "$VARFILE")
    if gh variable set "$VAR" -b "$VALUE" -R "$OWNER/$REPO"; then
        echo "Variable $VAR has been set."
    else
        echo "Failed to set variable $VAR."
    fi
done

echo "Variables have been set."



################################################
## please create "var.yml" in the following format:
# EXAMPLE:
# VAR1: "value1"
# VAR2: "value2"
################################################
