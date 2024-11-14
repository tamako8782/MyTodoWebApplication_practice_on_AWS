#!/bin/bash

###################github secretsへの登録のために実施###################

## リポジトリ情報を設定 #########################
OWNER="tamako8782"
REPO="MyTodoWebApplication_practice_on_Azure"
SECFILE="secrets.yml"

## yqとghがインストールされていることを確認 #########################

if ! command -v yq &> /dev/null; then
    echo "yq could not be found, please install it."
    exit 1
fi

if ! command -v gh &> /dev/null; then
    echo "gh CLI could not be found, please install it."
    exit 1
fi

## secrets.ymlから変数を読み込む #########################
SECRETS=$(yq eval 'keys | .[]' "$SECFILE")

## 変数をGitHub Actionsのシークレットとして設定 #########################

for SEC in $SECRETS; do
    VALUE=$(yq eval ".$SEC" "$SECFILE")
    if gh secret set "$SEC" -b "$VALUE" -R "$OWNER/$REPO"; then
        echo "Secret $SEC has been set."
    else
        echo "Failed to set secret $SEC."
    fi
done

echo "Secrets have been set."

################################################
## please create "secrets.yml" in the following format:
# EXAMPLE:
# VAR1: "value1"
# VAR2: "value2"
################################################
