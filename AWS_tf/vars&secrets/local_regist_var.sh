#!/bin/bash

################### ローカル環境に変数を設定するために実施 ###################

# 読み込み元ファイルを設定
VARFILE="var.yml"

# yqがインストールされていることを確認
if ! command -v yq &> /dev/null; then
    echo "yq could not be found, please install it."
    exit 1
fi

# var.ymlから変数を1行ずつ読み込む
yq eval 'keys | .[]' "$VARFILE" | while read -r VAR; do
    VALUE=$(yq eval ".$VAR" "$VARFILE")
    export "$VAR"="$VALUE"
    echo "Exported $VAR with value $VALUE"
done

echo "All variables have been exported to the local environment."
